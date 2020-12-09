import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Add_ToDo } from './../Redux/actions'
import Autocomplete from '@material-ui/lab/Autocomplete';
import DropDown from './DropDwon'
import { Grid, Paper } from '@material-ui/core';


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

function Forms(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: props.title != undefined ? props.title : "",
        parent: props.parent != undefined ? props.parent : "null",
    })

    let onChangeInpute = e => {
        console.log('[onChangeInpute]', e.target.value)
        setFormData((state) => ({
            parent: state.parent,
            title: e.target.value,
        }))
    }
    let onChangeAuto = option => {
        console.log("[onChangeAuto]", option)
        setFormData((state) => ({
            title: state.title,
            parent: option != null ? option.id : "null"
        }))
    }

    return (
        <>
            <form >
                <Grid container className={classes.grid} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid>
                                <TextField
                                    className={classes.TextField}
                                    id="outlined-basic"
                                    label={<>عنوان <span style={{ color: 'red' }}>*</span></>}
                                    variant="outlined"
                                    onChange={onChangeInpute} />
                            </Grid>
                            <Grid>
                                <DropDown list={props.Todos} onChangeAuto={onChangeAuto} />
                            </Grid>
                            <Button className={classes.Button} variant="contained" color="primary" onClick={(event) => { props.dispatch(Add_ToDo(formData.title, "1222", 12, formData.parent)) }}>اضافه کردن</Button>

                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </>
    );
}

const stateMapToprops = state => {
    return {
        Todos: state.Todos
    }
}

export default connect(stateMapToprops)(Forms)