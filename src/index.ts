import { ApiPromise, WsProvider } from '@polkadot/api';
import { writeFile } from 'fs';

// import { typesBundle, typesChain } from '@polkadot/apps-config';
import config from '../config';

export default class NodeConnection {
  wsEndpoint: string | undefined

  constructor (url: string) {
    this.wsEndpoint = url;
  }

  async getConnectedApiInstance (): Promise<ApiPromise | null> {
    try {
      // do not autoconnect
      const provider = new WsProvider(this.wsEndpoint, false);

      const api = new ApiPromise({ provider });
      // new ApiPromise({ provider, registry, signer, types, typesBundle, typesChain });

      // commented out as to not spam, but useful for debugging
      // to make sure we connect only once.

      api.on('connected', () => {
        console.info('--> api connected', this.wsEndpoint);
      });

      // api.on('disconnected', () => {
      //   console.info('<-- api disconnected');
      // });

      await api.connect();
      await api.isReady;
      return api;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  disconnectApi (api: ApiPromise): void {
    api.disconnect().catch((e) => console.error('⭕ disconnection error', e));
  }
}

interface NodeInfo {
  name: string
  metadata: string;
  nodeVersion: number;
}

interface NodeResult extends NodeInfo {
  genesis: string;
}

type Result = Record<string, NodeInfo>

const allCalls = config.map(async ({ rpcEndpoint, name }) => {
  const connection = new NodeConnection(rpcEndpoint);
  const api = await connection.getConnectedApiInstance();
  if (!api) { return; }

  const nodeVersion = api.runtimeVersion.specVersion.toNumber();
  const nodeMeta = api.runtimeMetadata.asCallsOnly.toHex();
  const genesis = api.genesisHash.toString();

  return {
    genesis,
    metadata: nodeMeta,
    name,
    nodeVersion
  } as NodeResult;
});

Promise.all(allCalls)
  .then((res) => {
    const data = res.reduce((acc: Result, info: NodeResult| undefined) => {
      const { genesis, metadata, name, nodeVersion } = info || {};
      const resultat = genesis && metadata && name && nodeVersion
        ? {
            ...acc,
            [genesis]: {
              metadata,
              name,
              nodeVersion
            }
          }
        : acc;

      return resultat;
    }, {} as Result);

    // console.log('data', data);
    writeFile('./metadata.json', JSON.stringify(data, null, 2), () => process.exit(0));
  })
  .catch(console.error);

