import React from 'react';
import styled from 'styled-components';

export default styled.div`
  width: 60%;
  @media only screen and (max-width: 600px) {
    width: 95%;
  }
  max-width: 750px;
  margin: 0 auto;
  h2 {
    margin: 0;
  }
  p {
    margin: 0 0 16px 0;
  }
`;
