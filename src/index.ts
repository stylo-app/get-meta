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

      // api.on('connected', () => {
      //   console.info('--> api connected', this.wsEndpoint);
      // });

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
  hex: string;
  name: string;
  specVersion: number;
}

interface NodeResult extends NodeInfo {
  genesis: string;
}

type Result = Record<string, Partial<NodeInfo>>

const allCalls = config.map(async ({ rpcEndpoint, name, genesis }) => {
  const connection = new NodeConnection(rpcEndpoint);
  const api = await connection.getConnectedApiInstance();
  if (!api) { return; }

  const specVersion = api.runtimeVersion.specVersion.toNumber();
  const nodeMeta = api.runtimeMetadata.asCallsOnly.toHex();
  const nodeGenesis = api.genesisHash.toString();

  if (nodeGenesis !== genesis) throw new Error(`Oops, genesis mismatch with ${name}`);

  return {
    genesis,
    hex: nodeMeta,
    name,
    specVersion
  } as NodeResult;
});

Promise.all(allCalls)
  .then((res) => {
    const data = res.reduce((acc: Result, info: NodeResult| undefined) => {
      const { hex, name, specVersion } = info || {};
      const resultat = hex && name && specVersion
        ? {
            ...acc,
            [`${name}Metadata`]: {
              hex,
              specVersion
            }
          }
        : acc;

      return resultat;
    }, {} as Result);

    // console.log('data', data);
    writeFile('./metadata.json', JSON.stringify(data, null, 2), () => process.exit(0));
  })
  .catch(console.error);

