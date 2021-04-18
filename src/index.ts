import { writeFile } from 'fs';
import WebSocket from 'ws';

import config from '../config';

export default class NodeConnection {
  wsEndpoint: string | undefined
  isConnected = false
  wsConnection: WebSocket | undefined
  requestNumber = 0

  constructor (url: string) {
    this.wsEndpoint = url;
  }

  connect (): Promise<void> {
    if (!this.wsEndpoint) {
      throw new Error('Nothing to connect to');
    }
    const ws = new WebSocket(this.wsEndpoint);

    return new Promise<void>((resolve, reject) => {
      this.wsConnection = ws.on('open', () => {
        this.isConnected = true;

        console.log('--> Connected to', this.wsEndpoint);
        resolve();
      });

      ws.on('error', () => {
        reject(new Error('Ws error'));
      });
    });
  }

  get<T> (method: string, params? : string): Promise<T> {
    if (this.wsConnection) {
      const paramsCall = params ? ` ,"params": ${params}` : '';
      const id = this.requestNumber;
      this.requestNumber = id + 1;

      this.wsConnection.send(`{"id":${id}, "jsonrpc":"2.0", "method": "${method}"${paramsCall}}`);

      return new Promise((resolve, reject) => {
        if (!this.wsConnection) {
          reject(new Error('Not connected'));
          return;
        }

        this.wsConnection.on('message', function incoming (data) {
          const json = (JSON.parse(data as string) as Record<string, unknown>);
          // console.log('Got answer for id', json.id);

          if (Number(json.id) === id) {
            return resolve((json.result) as T);
          }
          // console.log(json.result);
        });
      });
    } else {
      throw new Error('wsConnection undefined');
    }
  }

  disconnect (): void {
    console.log('<--- Disconnecting from', this.wsEndpoint);
    this.wsConnection?.close();
  }
}

interface NodeInfo {
  hex: string;
  name: string;
  specVersion: number;
}

interface NodeResult extends NodeInfo {
  genesis: string;
}

type Result = Record<string, Partial<NodeInfo>>

const allCalls = config.map(async ({ rpcEndpoint, name, genesis }) => {
  const node = new NodeConnection(rpcEndpoint);

  await node.connect();

  const [spec, nodeGenesis, hex] = await Promise.all([
    await node.get<{specVersion: number}>('chain_getRuntimeVersion'),
    await node.get<string>('chain_getBlockHash', '[0]'),
    await node.get<string>('state_getMetadata')

  ]).catch(console.error) || [];

  node.disconnect();

  if (nodeGenesis !== genesis) throw new Error(`Oops, genesis mismatch with ${name}`);

  return {
    genesis,
    hex,
    name,
    specVersion: spec?.specVersion
  } as NodeResult;
});

Promise.all(allCalls)
  .then((res) => {
    const data = res.reduce((acc: Result, info: NodeResult| undefined) => {
      const { hex, name, specVersion } = info || {};
      const result = hex && name && specVersion
        ? {
            ...acc,
            [`${name}Metadata`]: {
              hex,
              specVersion
            }
          }
        : acc;

      return result;
    }, {} as Result);

    // console.log('data', data);
    writeFile('./metadata.json', JSON.stringify(data, null, 2), () => process.exit(0));
  })
  .catch(console.error);

