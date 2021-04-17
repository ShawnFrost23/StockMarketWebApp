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
    color: '#000000',
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

const CssTextFieldLightVersion = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '000000',
      },
      '&:hover fieldset': {
        borderColor: '000000',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    '& label': {
      color: '000000',
      border: 'black',
    },

  },
})(TextField);

function CustomTextField({ lightVersion, placeholder, type, setValue, errorStatus, helperText, size }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  if (lightVersion === true) {
    return (
      <CssTextFieldLightVersion 
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
        helperText={helperText}
        size={size}
        />
    )
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
      helperText={helperText}
      size={size}
      />
  )
}

export default CustomTextField