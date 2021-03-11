import React from 'react'
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
    borderColor: '#161a25',
    width: '35ch',
  },
  input : {
    color: '#161a25',
  }
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '161a25',
      },
      '&:hover fieldset': {
        borderColor: '161a25',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
    '& label': {
      color: '161a25',
      border: '161a25',
    },

  },
})(TextField);

function CustomTextField({ placeholder }) {
  const classes = useStyles();
  return (
    <CssTextField 
      className={classes.margin} 
      id="custom-css-standard-input" 
      label={placeholder}
      InputProps={{
        className: classes.input,
      }}
      variant="outlined"
      />
  )
}

export default CustomTextField