import React from 'react';
import styled from 'styled-components';

export default styled.div`
  userSelect: 'none';
  margin: 1px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: ${props => props.col}
   width: 100px;
   height: 100px;
   @media only screen and (max-width: 600px) {
       width: 55px;
        height: 55px;
  }
   color: yellow;
`;
