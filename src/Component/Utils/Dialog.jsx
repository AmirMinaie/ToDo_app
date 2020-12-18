import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {

    const [open, setOpen] = React.useState(false);
    const rezalteDialog = props.dialogRezalte

    useEffect(() => {
        console.log("update open", props.open !== undefined ? props.open : false);
        setOpen(props.open !== undefined ? props.open : false)
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
            <DialogTitle id="alert-dialog-title">آیا از حذف این ردیف مطمئن هستید؟</DialogTitle>
            <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
                   
          </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handle("Disagree")} color="primary">
                    خیر
          </Button>
                <Button onClick={() => handle("Agree")} color="primary" autoFocus>
                    بله
          </Button>
            </DialogActions>
        </Dialog>
    );
}
export default AlertDialog