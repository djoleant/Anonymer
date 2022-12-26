import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField } from '@mui/material';

export default function DenyApplicationDialog({ name, studentId, internshipId, applicationId, remove }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [message, setMessage] = React.useState("Your application ah been denied");

    const denyApplication = async () => {
        await fetch(`http://localhost:7240/Internship/InternshipAction?internshipId=${internshipId}&studentId=${studentId}&applicationId=${applicationId}&action=Deny&denyOthers=${false}&message=${message}`, {
            method: "POST",
            credentials: "include"
        });
        handleClose();
        remove();
    }

    return (
        <div>

            <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpen}
            >
                Deny Application
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deny internship application?"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>{"Inform " + name + " about the denial of their application:"}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message (Optional)"
                        fullWidth
                        multiline
                        variant="standard"
                        onChange={(e) => { setMessage(e.target.value) }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={denyApplication} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
