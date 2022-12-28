import {
  Button,
  Divider,
  Card,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";


import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Delete from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/ModeComment";
import EditComment from "./EditComment";
import { useNavigate } from "react-router-dom";

export default function CommentCard({
  id = 0,
  authorID = 0,
  text = "Text...",
  commentUpvotes = 0,
  commentDownvotes = 0,
  time,
  maxWidth = "100%",
}) {
  const navigate = useNavigate();

  const getDateString = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const getUserCommentInfo = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/HasUserVotedComment/" +
        localStorage.getItem("userID") +
        "/" +
        id
    );
    const data = await resp.json();
    setHasVoted(data);
  };

  const getAuthor = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/GetUsername/" + authorID
    );
    const data = await resp.json();
    setAuthor(data.username);
  };

  const upvote = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/UpvoteComment/" +
        id +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      setUpvotes(upvotes + 1);
      getUserCommentInfo();
    }
  };

  const downvote = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/DownvoteComment/" +
        id +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      setDownvotes(downvotes + 1);
      getUserCommentInfo();
    }
  };

  const deleteComment = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/DeleteComment/" + id,
      {
        method: "DELETE",
      }
    );
    navigate(0);
  };

  const update = () => {
    getUserCommentInfo();
  };

  useEffect(() => {
    getUserCommentInfo();
    getAuthor();
  }, []);

  const [hasVoted, setHasVoted] = useState({
    upvoted: false,
    downvoted: false,
  });
  const [author, setAuthor] = useState("");
  const [upvotes, setUpvotes] = useState(commentUpvotes);
  const [downvotes, setDownvotes] = useState(commentDownvotes);

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{ width: "40px" }}
          onClick={() => {
            upvote();
          }}
        >
          <ArrowUpwardIcon color={hasVoted.upvoted ? "success" : "disabled"} />
        </IconButton>
        <Typography align="right" variant="subtitle2">
          {upvotes}
        </Typography>
        <IconButton
          sx={{ width: "40px" }}
          onClick={() => {
            downvote();
          }}
        >
          <ArrowDownwardIcon
            color={hasVoted.downvoted ? "error" : "disabled"}
          />
        </IconButton>
        <Typography align="right" variant="subtitle2">
          {downvotes}
        </Typography>

        <IconButton
          sx={{ width: "40px" }}
          onClick={() => {
            deleteComment();
          }}
        >
          <Delete />
        </IconButton>
        <EditComment currentText={text} update={update} id={id} />
      </Box>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          {text}
        </Typography>
        <Typography> {time.substring(11, 16)}</Typography>
        <Typography> {time.substring(0, 10)}</Typography>
        <Divider style={{ marginTop: 20 }}></Divider>
      </Grid>
    </Grid>
  );
}
