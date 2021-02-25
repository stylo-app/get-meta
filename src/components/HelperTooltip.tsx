
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props {
	content: string
}

const myIcon = ({ className }:{className?: string}) => <Icon className={className}
  name='question circle'/>;

const StyledIcon = styled(myIcon)`
	color: #aeaeae;
	margin-left: 0.2rem !important;
`;

const HelperTooltip = ({ content }:Props) =>
  <Popup
    content={content}
    hoverable={true}
    trigger={<span><StyledIcon/></span>}
  />;

export default HelperTooltip;