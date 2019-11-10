import React, { useEffect, useState } from 'react';
import ButtonStyles from './ButtonStyles.jsx';

const Button = props => {
  return (
    <>
      <ButtonStyles>
        <button {...props} />
      </ButtonStyles>
    </>
  );
};

export default Button;
