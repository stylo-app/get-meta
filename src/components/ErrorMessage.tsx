
import React from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: JSX.Element;
}

const ErrorMessage = ({ children, className }: Props) => {

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default styled(ErrorMessage)`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        margin: 10px;
        vertical-align: middle;
        width: 32px;
    }
`;