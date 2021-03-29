# Get substrate metadata CLI for any WS node

### config
Edit the config.ts to export an array of the nodes info you want to get the metadata for. Example

```sh
export default [
  {
    genesis: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    name: 'kusama',
    rpcEndpoint: 'wss://kusama-rpc.polkadot.io'
  }
]
```

### Run

```bash
yarn && yarn start
```

You will get the output in `metadata.json`
