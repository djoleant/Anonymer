import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';

export default function EditInternshipDialog({ currentTitle, currentDuration, currentDescription, currentCompensation, internshipId, update }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        //console.log(name, duration, compensation, description)
        let fetchReq = `http://localhost:7240/Internship/EditInternship/${internshipId}/${name}/${description}/${duration}/${compensation}`
        fetchReq = encodeURI(fetchReq);
        fetch(fetchReq, {
            method: "PUT",
            credentials: "include"
        }).then(response => {
            response.json().then(data => {
                if (data.succeeded) {
                    update();
                }
                else {
                    alert("Changes were not successful");
                }
                handleClose();
            })
        })
    }

    const [name, setName] = useState(currentTitle);//title
    const [description, setDescription] = useState(currentDescription);
    const [duration, setDuration] = useState(currentDuration);
    const [compensation, setCompensation] = useState(currentCompensation);


    //console.log(filename)
    React.useEffect(() => {
        setName(currentTitle);
        setDuration(currentDuration);
        setDescription(currentDescription)
        setCompensation(currentCompensation)
    }, [currentDuration, currentTitle, currentCompensation, currentDescription])

    return (
        <div>

            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit Internship
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit profile info"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Internship Title"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                        required
                        error={name === "" || name === undefined}

                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setDuration(parseInt(e.target.value)) }}
                        value={duration}
                        required
                        error={duration === undefined}
                    />
                    <TextField
                        type="number"
                        autoFocus
                        margin="dense"
                        label="Compensation"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setCompensation(parseInt(e.target.value)) }}
                        value={compensation}
                        required
                        error={compensation === undefined}
                    />
                    <TextField
                        type="number"
                        autoFocus
                        margin="dense"
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description}
                        required
                        error={description === "" || description === undefined}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                        disabled={!(name !== "" && duration !== "" && description !== "")}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


