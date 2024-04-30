import React from 'react';
import { TextField, InputAdornment} from '@material-ui/core';


const Input = ({ name, handleChange,value, label, multiline, type,fullWidth,inputAdornmentText,className}) => (
  <span className={className===''?'':'textfield'}>
    <TextField
    value={value}
    className='textfieldclass'
      name={name}
      onChange={handleChange}
      variant="outlined"
      multiline={multiline}
      minRows={3}
      required
      fullWidth={window.width>=700?false:fullWidth}
      label={label}
      type={type}
      inputProps={{
        step: "0.1"
      }}
      InputProps={inputAdornmentText && {
        endAdornment: <InputAdornment position="end">{inputAdornmentText}</InputAdornment>,
      }}
    />
  </span>
);

export default Input;
