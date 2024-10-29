import React from 'react';
import { Box, Typography } from '@mui/material';

const Paragraph = ({ paragraph, blanks, answers, blankRefs }) => {
  
  const renderParagraph = () => {
    const splitText = paragraph.split(/(\[_input\])/);
    let blankIndex = 0;

    return splitText.map((part, index) => {
      if (part === "[_input]") {
        const blank = blanks[blankIndex++];
        return (
          <Box
            key={index}
            component="span"
            className="blank"
            data-blank-id={blank.id}
            ref={blankRefs.current[blank.id]}
            sx={{
              display: 'inline-block',
              width: '60px',
              borderBottom: '2px solid #000',
              textAlign: 'center',
              fontWeight: answers[blank.id] ? 'bold' : 'normal'
            }}
          >
            {answers[blank.id] || ""}
          </Box>
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <Typography variant="body1" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
      {renderParagraph()}
    </Typography>
  );
};

export default Paragraph;