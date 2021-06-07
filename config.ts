export interface Config {
  genesis: string;
  name: string;
  rpcEndpoint: string;
}

export default [
  {
    genesis: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    name: 'kusama',
    rpcEndpoint: 'wss://kusama-rpc.polkadot.io'
  },
  {
    genesis: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    name: 'polkadot',
    rpcEndpoint: 'wss://rpc.polkadot.io'
  },
  {
    genesis: '0x67dddf2673b69e5f875f6f25277495834398eafd67f492e09f3f3345e003d1b5',
    name: 'centrifuge',
    rpcEndpoint: 'wss://fullnode.centrifuge.io'
  },
  {
    genesis: '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b',
    name: 'edgeware',
    rpcEndpoint: 'ws://mainnet1.edgewa.re:9944'
  },
  {
    genesis: '0xe7c3d5edde7db964317cd9b51a3a059d7cd99f81bdbce14990047354334c9779',
    name: 'rococo',
    rpcEndpoint: 'wss://rococo-rpc.polkadot.io'
  },
  {
    genesis: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
    name: 'westend',
    rpcEndpoint: 'wss://westend-rpc.polkadot.io'
  },
  {
    genesis: '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a',
    name: 'statemine',
    rpcEndpoint: 'wss://kusama-statemine-rpc.paritytech.net'
  },
  {
    genesis: '0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba',
    name: 'kulupu',
    rpcEndpoint: 'wss://rpc.kulupu.corepaper.org/ws'
  }
] as Config[];
