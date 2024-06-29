import React, { useState, useEffect } from 'react';

const GuessWord = (props) => {
  const [revealedCharacters, setRevealedCharacters] = useState([]);

  useEffect(() => {
    const revealInterval = 3000; // Adjust the interval between reveals (in milliseconds)
    const allCharacters = props.inputString.split('');
    const remainingCharacters = allCharacters.filter(char => !revealedCharacters.includes(char));

    if (remainingCharacters.length > 0) {
      const revealTimeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
        const charToReveal = remainingCharacters[randomIndex];

        setRevealedCharacters(prev => [...prev, charToReveal]);
      }, revealInterval);

      return () => clearTimeout(revealTimeout);
    }
  }, [props.inputString, revealedCharacters]);

  return (
    <div>
      {/* Map over the characters array and display revealed characters or underscore */}
      {props.inputString.split('').map((char, index) => (
        <span key={index}>
          {revealedCharacters.includes(char) ? char : '_'}
          {' '}
        </span>
      ))}
      <sup>{  props.inputString.length}</sup>
    </div>
  );
};

export default GuessWord;




