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

export default function EditEmployerProfileDialog({ currentCompanyName, currentAddress, currentAbout, currentPicture, update }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSelectImage = () => {
        setFilename(fileInput.current.files[0].name)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let fetchreq = `http://localhost:7240/Account/EditEmployer?companyName=${name}&address=${address}&about=${about}&picture=${filename}`;
        fetchreq = encodeURI(fetchreq);
        fetch(fetchreq, {
            method: "PUT",
            credentials: "include"
        }).then(response => {
            response.json().then(data => {
                if (data.succeeded) {
                    localStorage.setItem("picture", filename)
                    update();
                }
                else {
                    alert("Changes were not successful");
                }
                handleClose();
            })
        })
        //alert(fileInput.current.files[0].name)
    }

    const [name, setName] = useState(currentCompanyName);
    const [about, setAbout] = useState(currentAbout);
    const [address, setAddress] = useState(currentAddress);
    const fileInput = React.createRef();

    const [filename, setFilename] = useState(currentPicture);
    //console.log(filename)
    React.useEffect(() => {
        setName(currentCompanyName);
        setAddress(currentAddress);
        setFilename(currentPicture);
        setAbout(currentAbout)
    }, [currentAddress, currentCompanyName, currentPicture, currentAbout])

    return (
        <div>

            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit profile
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
                        label="Company Name"
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
                        label="Address"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setAddress(e.target.value) }}
                        value={address}
                        required
                        error={address === "" || address === undefined}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="About"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setAbout(e.target.value) }}
                        value={about}
                        required
                        error={about === "" || about === undefined}
                    />
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Choose Picture
                            <input
                                type="file"
                                hidden
                                ref={fileInput}
                                onChange={handleSelectImage}
                            />
                        </Button>
                        <Avatar src={process.env.PUBLIC_URL + "/resources/" + filename}></Avatar>
                        <Typography>{filename}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                        disabled={!(name !== "" && address !== "" && about !== "" && filename !== "")}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


