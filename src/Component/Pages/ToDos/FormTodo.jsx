import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { To_do_Parent, notify_Type, Add_ToDo_Parent, ShowNotify, HidenNotify } from '../../../Redux/actions'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "inherit",
        flexWrap: "wrap",
        width: '100%',
        zIndex: '10',
        // pading
        margin: '20px'
    },
    div: {
        marginRight: '20px',

        paddingRight: '20px',
    },
    Tabs: {
        // flexGrow: 1,
        color: 'with',
        width: '100%',
        backgroundColor: '#64b5f6'
    },
    Button: {
        margin: '20px',
        width: '150px'

    },
    TextField: {
        margin: '20px',

    },
    star: {
        color: 'red'
    },
    grid: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function FormToDo(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: props.title !== undefined ? props.title : null,
        parent: props.parent !== undefined ? props.parent : null,
    })

    console.log("proprs Form", props)

    const [loadingBoutten, setLoadingBoutten] = useState(false);

    let onChangeInpute = e => {
        console.log('[onChangeInpute]', e.target.value)
        setFormData((state) => ({
            parent: state.parent,
            title: e.target.value,
        }))
    }

    let hendleOnChangeAutocom = (e, option) => {
        console.log("[onChangeAuto]", option)
        setFormData((state) => ({
            ...state,
            parent: option
        }))
    }

    let clear = (e) => {
        setFormData(() => ({
            title: "",
            parent: null
        }))
    }

    let OnClickSubmit = (event) => {
        console.log(" OnClickSubmit")
        setLoadingBoutten(true)
        props.dispatch(ShowNotify(notify_Type.info, "در حال ارسال اطلاعات"));
        const toDo = To_do_Parent(formData.title, "1222")

        axios.post('todo.json', toDo)
            .then((res) => {
                setLoadingBoutten(false)
                props.dispatch(ShowNotify(notify_Type.success, "اطلاعات با موفقیت ثبت شد"));
                props.dispatch(Add_ToDo_Parent(res.data.name, toDo))
            })
            .catch((error) => {
                setLoadingBoutten(false)
                console.log('error submite', error)
                props.dispatch(ShowNotify(notify_Type.success, "اطلاعات با موفقیت ثبت شد"));

            })
    }

    return (
        <form >
            <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid>
                            <TextField
                                value={formData.title ?? ""}
                                type="title"
                                className={classes.TextField}
                                id="outlined-basic"
                                label={<>عنوان <span style={{ color: 'red' }}>*</span></>}
                                variant="outlined"
                                onChange={onChangeInpute} />
                        </Grid>
                        <Grid>
                            {/* <DatePicker variant="outlined" id="fromDate" label="تاریخ استخدام" fullWidth required 
                            // className={classes.required}
                                value = {new Date() }
                                // setValue={handleChangFromDate}
                                format={"jYYYY/jMMMM/jDD"} /> */}
                        </Grid>
                        <Grid>
                            {/* <DropDown value={formData.parent} list={props.Todos} onChangeAuto={onChangeAuto} /> */}
                            <Autocomplete
                                id="Parent"
                                noOptionsText=""
                                value={formData.parent}
                                style={{ width: 300, margin: "20px" }}
                                options={props.Todos}
                                classes={{ option: classes.option, }}
                                autoHighlight
                                getOptionLabel={option => option.data.title}
                                onChange={hendleOnChangeAutocom}
                                renderOption={(option) =>
                                    (<div style={{ pading: "20px" }}>
                                        {option.data.title}
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
                                    />)} />
                        </Grid>
                        <Button className={classes.Button} size='large' variant="contained" color="primary" disabled={loadingBoutten} onClick={OnClickSubmit}
                        >{loadingBoutten ? <CircularProgress /> :
                            <>اضافه کردن</>}</Button>
                        <Button className={classes.Button} size='large' variant="contained" color="inherit" onClick={clear}>لغو</Button>

                    </Grid>
                </Grid>
            </Grid>

        </form>
    );
}

const stateMapToprops = state => {
    return {
        Todos: state.Todos
    }
}

export default connect(stateMapToprops)(FormToDo)