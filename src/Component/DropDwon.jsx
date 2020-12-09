import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    margin: '20px',
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function DropDown(Props) {
  const classes = useStyles();
  const { list, onChangeAuto } = Props;
  return (
    <Autocomplete
      id="Parent"
      style={{ width: 300, margin: "20px" }}
      options={list}
      classes={{ option: classes.option, }}
      autoHighlight
      getOptionLabel={(option) => option.title}
      onChange={(e, option) => onChangeAuto(option)}
      renderOption={(option) =>
        (<div style={{pading:"20px"}}>
          {option.title}
        </div>)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="گروه را انتخاب کنید"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}