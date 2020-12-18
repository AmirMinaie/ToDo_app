import React from "react";
import { withStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import CuTabs from './Tab/CuTabs';
import FormTodo from "./FormTodo";
import {Notification} from '../../Utils';
import { connect } from 'react-redux';

const useStyles = theme => ({
    root: {
        display: "inherit",
        flexWrap: "wrap",
        width: '100%',
        zIndex: '10',
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
        backgroundColor: '#d1c4e9'
    },
    Button: {
        margin: '20px',

    },
    TabIcon: {},
    TextField: {
        margin: '20px',

    },
    star: {
        color: 'red'
    }
});

class ToDos extends React.Component {

    state = {
        rowData: [],
        notify: { isOpen: false, message: '', type: '' }
    }
    submitAddRow =()=>{

    }
    

    render() {
        const { classes } = this.props;
        let {Todos} =this.props;
        console.log('[MainForm] render',this.state.rowData )
        return (
            <>
                <div className={classes.div}>
                    <Paper elevation={5} className={classes.root} >
                        <FormTodo submitAddRow={this.submitAddRow.bind(this)} />
                    </Paper>
                    <Paper elevation={5} className={classes.root} >
                        <CuTabs/>
                    </Paper>
                </div>
                <Notification notify={this.state.notify} setNotify={(Notify) => {
                    console.log('[ClickClose]', Notify);
                    this.setState({ notify: Notify });
                }
                } />
            </>
        );
    }
}

ToDos.propTypes = { classes: PropTypes.object.isRequired, };

const mapStateToPrprs = state =>{
    return{
        Todos : state.Todos
    }
}


export default connect(mapStateToPrprs)(withStyles(useStyles)(ToDos))