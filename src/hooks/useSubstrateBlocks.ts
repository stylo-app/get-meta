
import { useContext,useEffect, useState } from 'react';

import { ApiPromiseContext } from '../context/ApiPromiseContext';

const useSubBlocks = () => {
  const { api, isApiReady } = useContext(ApiPromiseContext);
  const [bestBlock, setBestBlock] = useState('');

  useEffect(() => {
    if(!api || !isApiReady){
      return;
    }

    api.derive.chain.bestNumber((res) => {
      setBestBlock(res.toString());
    });
  },[api, isApiReady]);

  return { bestBlock };
};

export default useSubBlocks;