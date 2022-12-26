import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography, TextField, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";

export default function EditStudentProfileDialog({
    currentName,
    currentLastName,
    currentPicture,
    update,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSelectImage = () => {
        setFilename(fileInput.current.files[0].name);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        fetch(
            "http://localhost:7240/Account/EditStudent?firstName=" +
            name +
            "&lastName=" +
            lastName +
            "&picture=" +
            filename,
            {
                method: "PUT",
                credentials: "include",
            }
        ).then((response) => {
            response.json().then((data) => {
                if (data.succeeded) {
                    localStorage.setItem("picture", filename);
                    update();
                } else {
                    alert("Changes were not successful");
                }
                handleClose();
            });
        });
        //alert(fileInput.current.files[0].name)
    };

    const [name, setName] = useState(currentName);
    const [lastName, setLastName] = useState(currentLastName);
    const fileInput = React.createRef();

    const [filename, setFilename] = useState(currentPicture);
    //console.log(filename)
    React.useEffect(() => {
        setName(currentName);
        setLastName(currentLastName);
        setFilename(currentPicture);
    }, [currentLastName, currentName, currentPicture]);

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
                <DialogTitle id="alert-dialog-title">{"Edit profile info"}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        required
                        error={name === undefined || name === ""}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        value={lastName}
                        required
                        error={lastName === undefined || lastName === ""}
                    />
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                        <Button variant="contained" component="label">
                            Choose Picture
                            <input
                                type="file"
                                hidden
                                ref={fileInput}
                                onChange={handleSelectImage}
                            />
                        </Button>
                        <Avatar
                            src={process.env.PUBLIC_URL + "/resources/" + filename}
                        ></Avatar>
                        <Typography>{filename}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                        disabled={!(name !== "" && filename !== "" && lastName !== "")}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// import React, { useState } from 'react';
// import {
//     Button,
//     Typography,
//     TextField,
//     Container,
//     CssBaseline,
//     Box,
//     Grid,
//     Paper,
//     Divider,
//     FormControl,
//     FormControlLabel
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// export default function EditStudent(props) {

//     const [textValue, setTextValue] = useState("");

//     const onTextChange = (e) => setTextValue(e.target.value);
//     const handleSubmit = () => console.log(textValue);
//     const handleReset = () => setTextValue("");

//     return (

//         <Container component="main"  >
//             <CssBaseline />
//             <React.Fragment>
//                 <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
//                     Edit your profile
//                 </Typography>
//                 <Paper
//                     sx={{ p: 3, mb: 4 }}
//                     variant="outlined"
//                 >
//                     <Grid container style={{ alignItems: "center", justifyContent: "center" }} spacing={3} sx={{ mb: 3 }}>
//                         <Box sx={{ mb: 3, position: "relative" }} variant="outlined">

//                         <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}>
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change email and username</Typography>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New email"} fullWidth />
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}>  </Typography>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New username"} fullWidth />
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change basic info </Typography>
//                             {/* <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} fullWidth />
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} fullWidth /> */}
//                             <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}></Grid>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} />
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} />

//                     </Grid>
//                     </Box>
//                 </Grid>

//                 <Box sx={{ mb: 3, position: "relative" }} variant="outlined">

//                     <Button variant="contained" endIcon={<SendIcon />}> Submit changes </Button>
//                 </Box>
//             </Paper>

//         </React.Fragment>
//         </Container >
//     );
// }
