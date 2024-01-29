import React, { useState, useEffect } from 'react';
import GameGrid from './Components/GameGrid';
import WordDisplay from './Components/WordDisplay';

const App = () => {
  const [word, setWord] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const fetchWordFromAPI = async () => {
      try {
        const response = await fetch('https://challenge.trio.dev/api/v1/wordle-words');
        if (!response.ok) {
          throw new Error('Error al obtener la palabra');
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);

        if (data && Array.isArray(data) && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomWord = data[randomIndex];

          setWord(randomWord);
        } else {
          console.error('La respuesta de la API no contiene una matriz de palabras válida.', data);
        }
      } catch (error) {
        console.error('Error al obtener la palabra:', error);
      }
    };

    fetchWordFromAPI();
  }, []); 

  const checkWord = (inputWord) => {
    if (gameCompleted) {
      return;
    }

    const comparisonResult = calculateWordComparison(inputWord, word);
      if (inputWord === word) {
        setGameCompleted(true);
        console.log('¡Ganaste!');
      }
  };

  const calculateWordComparison = (inputWord, targetWord) => {
    let correctPosition = 0;
    let wrongPosition = 0;

    for (let i = 0; i < inputWord.length; i++) {
      if (inputWord[i] === targetWord[i]) {
        correctPosition++;
      } else if (targetWord.includes(inputWord[i])) {
        wrongPosition++;
      }
    }

    return { correctPosition, wrongPosition };
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1 className='title'>WORDLE WORDS</h1>
      <WordDisplay word={word} />
      <GameGrid onCheckWord={checkWord} word={word} />
      {gameCompleted && (
        <div className='btn-container'>
          <p className='logrado'>¡GANASTE 🏆!</p>
          <button onClick={restartGame} className='btn-volver'>Volver a Jugar</button>
        </div>
      )}
    </div>
  );
};

export default App;
