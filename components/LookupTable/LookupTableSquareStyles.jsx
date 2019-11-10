import React from 'react';
import styled from 'styled-components';

export default styled.div`
  display: inline-block;

  margin: 1px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: ${props => props.col}
   width: 40px;
   height: 40px;
   img{
   position:absolute;
      width: 40px;
   }
   @media only screen and (max-width: 600px) {
      width: 25px;
      height: 25px;
      img{
        position:absolute;
        width: 25px;
      }
  }
   
   
  
`;
