import React from 'react';
import Draggable from 'react-draggable';
import { Box, Typography } from '@mui/material';

const WordDrag = ({ words, onDrop, blankRefs }) => {
  const handleDragStop = (e, data, word) => {

    let isDropped = false;
    Object.keys(blankRefs.current).forEach(blankId => {
      const blankElement = blankRefs.current[blankId].current;
      if (blankElement) {
        const rect = blankElement.getBoundingClientRect();
        // console.log(e, rect)

        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY + 50 >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          onDrop(Number(blankId), word);
          isDropped = true;
        }
      }
    });

    if (!isDropped) {
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap="10px" mt="20px">
      {words.map(wordData => (
        <Draggable
          key={wordData.id}
          onStop={(e, data) => handleDragStop(e, data, wordData.word)}
          position={{ x: 0, y: 0 }}
        >
          <Box
            sx={{
              padding: '5px 10px',
              border: '1px solid #333',
              borderRadius: '4px',
              display: 'inline-block',
              cursor: 'pointer',
              backgroundColor: wordData.color === "red" ? '#ffdddd' : '#f0f0f0',
              color: wordData.color === "red" ? 'red' : 'black',
              userSelect: 'none'
            }}
          >
            <Typography>{wordData.word}</Typography>
          </Box>
        </Draggable>
      ))}
    </Box>
  );
};

export default WordDrag;