import { ApiPromise } from '@polkadot/api';
export default class NodeConnection {
    wsEndpoint: string | undefined;
    constructor(url: string);
    getConnectedApiInstance(): Promise<ApiPromise | null>;
    getMetadata(api: ApiPromise): Promise<string>;
    getRuntimeVersion(api: ApiPromise): Promise<number>;
    disconnectApi(api: ApiPromise): void;
}
