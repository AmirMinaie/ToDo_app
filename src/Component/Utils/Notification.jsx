import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import { HidenNotify } from '../../Redux/actions';


const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

function Notification(props) {
    const notify = props.notify
    const classes = useStyles()

    const handleClose = (event, reason) => {
     props.dispatch(HidenNotify())
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={300}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
            <Alert
                severity={notify.severity}
                onClose={handleClose}
                style={{ fontSize: '18px' }}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => {
    return {
        notify: state.infoNotify
    }
}


export default connect(mapStateToProps)(Notification)