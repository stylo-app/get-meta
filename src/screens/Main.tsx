import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import BlockInfo from '../components/BlockInfo';
// import { ApiPromiseContext } from '../context/ApiPromiseContext';
// import { ApiPromiseContext } from '../context/ApiPromiseContext';

interface Props {
	className?: string;
}

const EthToSub = ({ className } : Props) => {
//   const { api, isApiReady } = useContext(ApiPromiseContext);

//   useEffect(() => {
//   	if (!api || !isApiReady) {
//   		console.log('api not ready yet...');

//   		return;
//   	}

//   	let unsubscribe: () => void;

//   	return () => unsubscribe && unsubscribe();
//   }, [api, isApiReady]);

  return (
    <Container className={className}>
      <hr/>
      <h2>Blocks</h2>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}/>
          <Grid.Column className='arrow'
            width={2}>
            <BlockInfo/>
          </Grid.Column>
          <Grid.Column className='accountCard'
            width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default styled(EthToSub)`
`;
