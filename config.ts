export interface Config {
  name: string;
  rpcEndpoint: string;
}

export default [
  {
    name: 'kusama',
    rpcEndpoint: 'wss://kusama-rpc.polkadot.io'
  },
  {
    name: 'polkadot',
    rpcEndpoint: 'wss://rpc.polkadot.io'
  },
  // {
  //   name: 'centrifuge',
  //   rpcEndpoint: 'wss://fullnode.centrifuge.io'
  // },
  // {
  //   name: 'edgeware',
  //   rpcEndpoint: 'ws://mainnet4.edgewa.re:9944'
  // },
  // {
  //   name: 'rococo',
  //   rpcEndpoint: 'wss://rococo-rpc.polkadot.io',
  //   version: 0
  // },
  {
    name: 'westend',
    rpcEndpoint: 'wss://westend-rpc.polkadot.io'
  }
  // {
  //   name: 'kulupu',
  //   rpcEndpoint: "wss://rpc.kulupu.corepaper.org/ws",
  //   version: 0
  // },
] as Config[];
