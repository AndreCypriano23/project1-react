import P from 'prop-types';
import './styles.css';
 
import React from 'react';

//Isso é uma função e não uma classe, mas lembrando, poderia ser uma classe também que extends component
export const Button = ({ text, onClick, disabled=false }) => (
      <button
        className='button' 
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
);

Button.defaultProps = {
  disabled: false, 
};

//Estou apenas tipando as props
Button.propTypes = {
   text: P.string.isRequired,
   onClick: P.func.isRequired,
   disabled: P.bool,
};
  


