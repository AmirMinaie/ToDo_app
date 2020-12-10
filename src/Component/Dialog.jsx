import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

    const [open, setOpen] = React.useState(false);
    const rezalteDialog = props.dialogRezalte

    useEffect(() => {
        console.log("update open", props.open != undefined ? props.open : false);
        setOpen(props.open != undefined ? props.open : false)
    }, [props.open])

    const handle = (rezalte) => {
        rezalteDialog(rezalte);
        setOpen(false);
    };

    console.log("render dialog", open);
    return (
        <Dialog
            open={open}
            onClose={() => handle("Disagree")}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handle("Disagree")} color="primary">
                    Disagree
          </Button>
                <Button onClick={() => handle("Agree")} color="primary" autoFocus>
                    Agree
          </Button>
            </DialogActions>
        </Dialog>
    );
}
