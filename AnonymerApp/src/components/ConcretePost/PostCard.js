import {
  Button,
  Card,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditPost from "./EditPost";

export default function PostCard({
  text = "Text...",
  postUpvotes = 0,
  postDownvotes = 0,
  time,
  maxWidth = "100%",
  authorID,
  postID,
}) {
  const navigate = useNavigate();



  const getDateString = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const getUserPostInfo = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/HasUserVoted/" +
        localStorage.getItem("userID") +
        "/" +
        postID
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
      "http://localhost:5222/api/Home/Upvote/" +
        postID +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      //setUpvotes(upvotes + 1);
      getUserPostInfo();
      getPostInfo();
    }
  };

  const downvote = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/Downvote/" +
        postID +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      //setDownvotes(downvotes + 1);
      getUserPostInfo();
      getPostInfo();
    }
  };

  // http://localhost:5222/api/Home/DeletePost/10
  // const deletePost = async () => {
  //     const resp = await fetch("http://localhost:5222/api/Home/DeletePost/" + postID, {
  //         method: "DELETE"
  //     });
  //     if (resp.ok) {
  //         //setDownvotes(downvotes + 1);
  //         Navigate("/Home")
  //     }
  // }

  const deletePost = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/DeletePost/" + postID,
      {
        method: "DELETE",
      }
    );
    navigate("/Feed");
  };

  const update = () => {
    getPostInfo();
  };

  const editPost = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/EditPost/" + postID + "/" + editText,
      {
        method: "PUT",
      }
    );
    navigate("/Feed");
  };

  const getPostInfo = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/GetPost/" + postID
    );
    const data = await resp.json();
    setPostInfo(data.post);
    setShowText(data.post.text);
  };

  useEffect(() => {
    getUserPostInfo();
    getAuthor();
    getPostInfo();
  }, []);

  useEffect(() => {
    getUserPostInfo();
    getAuthor();
    getPostInfo();
  }, [text]);

  const [deleted, setDeleted] = useState(false);

  const [hasVoted, setHasVoted] = useState({
    upvoted: false,
    downvoted: false,
  });
  const [author, setAuthor] = useState("");
  const [editText, setEditText] = useState("");
  const [upvotes, setUpvotes] = useState(postUpvotes);
  const [downvotes, setDownvotes] = useState(postDownvotes);
  const [postInfo, setPostInfo] = useState({ upvotes: 0, downvotes: 0 });
  const [showText, setShowText] = useState(text);

  return (
    <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
      <Grid container>
        <Grid item xs={1} sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ width: "40px" }}
              onClick={() => {
                upvote();
                getPostInfo();
              }}
            >
              <ArrowUpwardIcon
                color={hasVoted.upvoted ? "success" : "disabled"}
              />
            </IconButton>
            <Typography align="right" variant="subtitle2">
              {postInfo.upvotes}
            </Typography>
            <IconButton
              sx={{ width: "40px" }}
              onClick={() => {
                downvote();
                getPostInfo();
              }}
            >
              <ArrowDownwardIcon
                color={hasVoted.downvoted ? "error" : "disabled"}
              />
            </IconButton>
            <Typography align="right" variant="subtitle2">
              {postInfo.downvotes}
            </Typography>
            <IconButton
              sx={{ width: "40px" }}
              onClick={() => {
                deletePost();
              }}
            >
              <Delete />
            </IconButton>
            <EditPost currentText={text} update={update} id={postID} />
          </Box>
        </Grid>
        <Grid container item xs={11}>
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              {showText}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {time != undefined ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 11,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              align="right"
              variant="subtitle2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/PersonProfile/" + authorID);
              }}
            >
              {"Author:"}
            </Typography>
            <Typography
              align="right"
              variant="subtitle2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/PersonProfile/" + authorID);
              }}
              color="#32CD32"
            >
              {"@" + author}
            </Typography>
          </Box>
          <Typography align="right" variant="subtitle2">
            {getDateString(time)}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Card>
  );
}
