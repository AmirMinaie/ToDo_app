
/* @param variant, id, label, format, value, setValue, fullWidth
 * @param withTime: is described above.
 */

import React from 'react';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import JalaaliUtils from "@date-io/jalaali";
import IRLocale from "date-fns/locale/fa-IR";
import jalaaliMoment from "moment-jalaali";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        margin:"0",
        "& label span": {
            color: "red"
        }
    },
    mrg:{
        margin:"0",
        "& label span": {
            color: "red"
        }
    },
    NonDispaly: {
        display: "none"
    },
    enter: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "green"
        },
    }
});

const DatePicker = ({ variant, id, label, format, value, setValue, fullWidth, withTime, required, defaultValue, disabled, helperText, FormHelperTextProps, errorState }) => {
    jalaaliMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

    const classes = useStyles();
console.log("Utiles",JalaaliUtils);
    return (
        <MuiPickersUtilsProvider utils={JalaaliUtils} locale={IRLocale}>
            {withTime ? (
                <KeyboardDatePicker
                  required={required}
                    ampm={false}
                    okLabel="تایید"
                    cancelLabel="لغو"
                    inputVariant={variant}
                    margin="normal"
                    id={id}
                    defaultValue={defaultValue}
                    label={label}
                    disabled={disabled}
                    format={format}
                    value={value}
                    helperText={helperText}
                    FormHelperTextProps={FormHelperTextProps}

                    className={(errorState) ? classes.root : classes.mrg }
                    onChange={setValue}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}

                    fullWidth={fullWidth}
                />
            ) : (
                    <KeyboardDatePicker
                    required={required}
                        okLabel="تایید"
                        cancelLabel="لغو"
                        inputVariant={variant}
                        margin="normal"
                        id={id}
                        disabled={disabled}
                        label={label}
                        format={format}
                        value={value}
                        helperText={helperText}
                        FormHelperTextProps={FormHelperTextProps}
                        defaultValue={defaultValue}
                        className={(errorState) ? classes.root :  classes.mrg }
                        onChange={setValue}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}

                        fullWidth={fullWidth}
                    />
                )}
        </MuiPickersUtilsProvider>
    );
}

export const DatePicker;
