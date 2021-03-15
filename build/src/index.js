"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const config_1 = __importDefault(require("../config"));
class NodeConnection {
    constructor(url) {
        // this.getConnectedApiInstance().then((api) => {
        //   this.disconnectApi(api);
        //   console.info('created and api instance for', url);
        // }).catch((e) => {
        //   console.error(e);
        // });
        this.wsEndpoint = url;
    }
    async getConnectedApiInstance() {
        try {
            // do not autoconnect
            const provider = new api_1.WsProvider(this.wsEndpoint, false);
            const api = new api_1.ApiPromise({ provider });
            // new ApiPromise({ provider, registry, signer, types, typesBundle, typesChain });
            // commented out as to not spam, but useful for debugging
            // to make sure we connect only once.
            api.on('connected', () => {
                console.info('--> api connected', this.wsEndpoint);
            });
            api.on('disconnected', () => {
                console.info('<-- api disconnected');
            });
            await api.connect();
            await api.isReady;
            return api;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    // async getApiInstance (url?: string): Promise<ApiPromise | undefined> {
    //   if (!!url && !this.api) {
    //     const provider = new HttpProvider(url);
    //     this.api = new ApiPromise({ provider });
    //   }
    //   this.api && await this.api.isReady;
    //   return this.api;
    // }
    async getMetadata(api) {
        // const api = await this.getConnectedApiInstance();
        try {
            if (!api) {
                throw new Error('api not ready');
            }
            const metadata = await api.runtimeMetadata.asCallsOnly.toHex();
            // this.disconnectApi(api);
            return metadata;
        }
        catch (e) {
            console.error('⭕ An error occured when querying the metadata', e);
            // this.disconnectApi(api);
            return '';
        }
    }
    async getRuntimeVersion(api) {
        // const api = await this.getConnectedApiInstance();
        try {
            if (!api) {
                throw new Error('api not ready');
            }
            const runtimeVersion = await api.runtimeVersion;
            // this.disconnectApi(api);
            return runtimeVersion.specVersion.toNumber();
        }
        catch (e) {
            console.error('⭕ An error occured when querying the runtime version', e);
            // this.disconnectApi(api);
            return 0;
        }
    }
    disconnectApi(api) {
        api.disconnect().catch((e) => console.error('⭕ disconnection error', e));
    }
}
exports.default = NodeConnection;
const allCalls = config_1.default.map(async ({ rpcEndpoint, name, version }) => {
    const connection = new NodeConnection(rpcEndpoint);
    const api = await connection.getConnectedApiInstance();
    if (!api) {
        return {};
    }
    const nodeVersion = await connection.getRuntimeVersion(api);
    console.log(name, nodeVersion, "vs", version);
    const nodeMeta = await connection.getMetadata(api);
    return {
        nodeVersion,
        metadata: nodeMeta.length
    };
});
Promise.all(allCalls)
    .then((res) => { console.log(res); })
    .catch(console.error);
