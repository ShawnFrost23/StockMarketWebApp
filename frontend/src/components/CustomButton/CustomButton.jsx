import React from 'react';
import {
  withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
  root: {
    width: '80%',
    backgroundColor: '#161a25',
    color: 'white',
    borderColor: 'white',
    fontSize: 16,
    padding: '5px 35px',
    margin: '15px',
    '&:hover': {
      backgroundColor: '#5ca933',
      borderColor: '#5ca933',
    },
  },

}))(Button);

// Functional Class for custom button component. 
function CustomButton({ displayText, func }) {
  return (
    <ColorButton variant="outlined" color="primary" size="large" onClick={func} >{displayText}</ColorButton>
  )
}

export default CustomButton