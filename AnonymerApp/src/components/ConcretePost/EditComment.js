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
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditComment({ currentText, update, id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  
  const handleSubmit = () => {
    let fetchreq =
      "http://localhost:5222/api/Home/EditComment/" + id + "/" + text;
    fetchreq = encodeURI(fetchreq);
    console.log(fetchreq);
    fetch(fetchreq, {
      method: "PUT",
      credentials: "include",
    }).then((response) => {
      update();
      handleClose();
      navigate(0);
    });
  };

  const [text, setText] = useState(currentText);

  //console.log(filename)
  React.useEffect(() => {
    setText(currentText);
  }, [currentText]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit paper info"}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            required
            error={text === "" || text === undefined}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus disabled={!(text !== "")}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
