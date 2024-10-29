import React, { useState, useEffect, useRef } from 'react';
import Paragraph from './components/Paragraph';
import WordDrag from './components/WordDrag';
import { Container, Button, Typography } from '@mui/material';
import data from './data.json'



function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [wordPositions, setWordPositions] = useState({});
  const blankRefs = useRef({});

  useEffect(() => {
    const initialAnswers = {};
    data.question.blanks.forEach(blank => {
      initialAnswers[blank.id] = "";
      blankRefs.current[blank.id] = React.createRef();
    });
    setAnswers(initialAnswers);

    const initialPositions = {};
    data.question.dragWords.forEach(wordData => {
      initialPositions[wordData.word] = { ...wordData, position: `Position ${wordData.id}` };
    });
    setWordPositions(initialPositions);
  }, []);

  const handleDrop = (blankId, word) => {
    const blank = data.question.blanks.find(b => b.id === blankId);
    if (blank.correctAnswer === word) {
      setAnswers(prev => ({ ...prev, [blankId]: word }));
      const updatedPositions = { ...wordPositions };
      delete updatedPositions[word];
      setWordPositions(updatedPositions);
    }
  };

  const handleSubmit = () => {
    const isCorrect = data.question.blanks.every(
      blank => answers[blank.id] === blank.correctAnswer
    );
    setResult(isCorrect ? "Chính xác!" : "Sai!");
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>

      <Paragraph 
        paragraph={data.question.paragraph} 
        blanks={data.question.blanks} 
        answers={answers} 
        blankRefs={blankRefs} 
      />

      <WordDrag 
        words={Object.values(wordPositions)} 
        onDrop={handleDrop} 
        blankRefs={blankRefs} 
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>


      {result && (
        <Typography 
          variant="h6" 
          color={result === "Chính xác!" ? "success.main" : "error.main"} 
          style={{ marginTop: '20px' }}
        >
          {result}
        </Typography>
      )}


    </Container>
  );
}

export default App;