
import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import useSubBlocks from '../hooks/useSubstrateBlocks';
import HelperTooltip from './HelperTooltip';

interface Props {
	className? : string;
}

const BlockInfo = ({ className }: Props) => {
  const { bestBlock: bestSubBlock } = useSubBlocks();

  return (

    <Grid className={className}>
      <Grid.Row>
        <Grid.Column width={2}/>
        <Grid.Column className='blockInfo'
          width={12}>
          <div>
            <h2>Substrate</h2>
            <div>
							Best<HelperTooltip content='Best block'/>: #{bestSubBlock}<br/>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default styled(BlockInfo)`
	.blockInfo {
		background: #d3d3d342;
		margin: .5rem;
		border-radius: 0.2rem;
		padding: .5rem;
		text-align: left;

		h2, h4 {
			text-align: center;
		}

		.blockInfo {
			padding: 1rem;
			text-align: left;
			background: #d3d3d342;
		}
	}
`;
