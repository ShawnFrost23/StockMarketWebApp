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
    borderColor: '#ffffff',
    width: '80%',
  },
  input : {
    color: '#ffffff',
  }
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'ffffff',
      },
      '&:hover fieldset': {
        borderColor: 'ffffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& label': {
      color: 'ffffff',
      border: 'ffffff',
    },

  },
})(TextField);

function CustomTextField({ placeholder, type, setValue, errorStatus }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <CssTextField 
      className={classes.margin} 
      id="custom-css-standard-input" 
      label={placeholder}
      type={type}
      InputProps={{
        className: classes.input,
      }}
      variant="outlined"
      onChange={handleChange}
      error={errorStatus}
      />
  )
}

export default CustomTextField