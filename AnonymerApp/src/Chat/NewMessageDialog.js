import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import UserSearch from './UserSearch';
import { JsonHubProtocol } from '@microsoft/signalr';



export default function NewMessageDialog({ loadChats }) {
    const [open, setOpen] = React.useState(false);
    const [receiver, setReceiver] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = async () => {
        console.log(receiver.id, message)
        fetch("http://localhost:7240/Chat/sendMessage/" + receiver.id, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ content: message, type: "IGNORE" }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(() => {
            loadChats()
            handleClose();
        })
    }

    return (
        <>

            <Tooltip title="New Message" placement="right">
                <IconButton
                    onClick={handleClickOpen}
                    sx={{ mr: 31 }}
                >
                    <RateReviewRoundedIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Send new message"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>{"Send message to:"}</DialogContentText>
                    <UserSearch onChange={setReceiver} />
                    <DialogContentText sx={{ mt: 3 }}>{"Message:"}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message"
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
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
