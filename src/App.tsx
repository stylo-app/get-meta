import 'semantic-ui-css/semantic.min.css';

import React from 'react';

import { WsProvider } from '@polkadot/api';

import Menu from './components/MenuBar';
import { ApiPromiseContextProvider } from './context/ApiPromiseContext';
import Main from './screens/Main';

const SUBSTRATE_PROVIDER = 'wss://rpc.polkadot.io';

console.log('Connecting to Substrate node:', SUBSTRATE_PROVIDER);

const App = () => {
  if (!SUBSTRATE_PROVIDER) {
    console.error('WS_PROVIDER not set');

    return null;
  }

  const wsProvider = new WsProvider(SUBSTRATE_PROVIDER);

  return (
    <>
      <Menu/>
      <ApiPromiseContextProvider provider={wsProvider}>
        <Main />
      </ApiPromiseContextProvider>
    </>
  );
};

export default App;
