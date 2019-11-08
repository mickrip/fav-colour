import React from "react";
import styled from "styled-components";

export default styled.div`
  userSelect: 'none';
  margin: 1px;
  border: 1px solid white;
  background: ${props => props.col}
   width: 100px;
   height: 100px
`;
