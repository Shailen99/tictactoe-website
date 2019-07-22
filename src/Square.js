import React from 'react';

//Turned square from a function into a constant as to allow it to change on instance with use of props (created parameters)
const Square = props => (
  <button className={`${props.winnerClass} square`} onClick={props.onClick}> 
    {props.value}
  </button>
);

export default Square;
