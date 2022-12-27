import {
  Paper,
  IconButton,
  Divider,
  Input,
  Box,
  Chip,
  Container,
  Grid,
  CssBaseline,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Menu as MenuIcon,
  Directions as DirectionsIcon,
  AddCircle as SearchIcon,
  CoPresent,
} from "@mui/icons-material";
import PostCard from "./components/ConcretePost/PostCard";
import { useParams } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function ConcretePost({
  text = "Text...",
  postUpvotes = 0,
  postDownvotes = 0,
  time,
  maxWidth = "100%",
  authorID,
  postID,
}) {
  const [hasVoted, setHasVoted] = useState({
    upvoted: false,
    downvoted: false,
  });

  const [author, setAuthor] = useState("");
  const [upvotes, setUpvotes] = useState(postUpvotes);
  const [downvotes, setDownvotes] = useState(postDownvotes);
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  const [post, setPost] = useState({
    id: "",
    authorID: "",
    categoryID: "",
    text: "",
    time: "",
    upvotes: 0,
    downvotes: 0,
  });

  const getUserPostInfo = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/HasUserVoted/" +
        localStorage.getItem("userID") +
        "/" +
        id
    );
    const data = await resp.json();
    setHasVoted(data);
  };

  const getComments = async () => {
    const result = await fetch(
      "http://localhost:5222/api/Home/GetComments/" + id
    );
    const data = await result.json();
    console.log("[GetComments:]", data);
    setComments(data.comments);
    console.log(comments);
  };

  const getPost = async () => {
    const resp = await fetch("http://localhost:5222/api/Home/GetPost/" + id);
    const data = await resp.json();
    setPost(data.post);
    console.log("Post je: ", post);
  };

  const upvote = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/Upvote/" +
        id +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      setUpvotes(upvotes + 1);
      getUserPostInfo();
    }
  };

  const getAuthor = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/GetUsername/" + post.authorID
    );
    const data = await resp.json();
    setAuthor(data.username);
    console.log("[getAuthor] author: ", author);
  };

  const downvote = async () => {
    const resp = await fetch(
      "http://localhost:5222/api/Home/Downvote/" +
        id +
        "/" +
        localStorage.getItem("userID"),
      {
        method: "PUT",
      }
    );
    if (resp.ok) {
      setDownvotes(downvotes + 1);
      getUserPostInfo();
    }
  };

  localStorage.setItem("userID", "2");
  useEffect(() => {
    getPost();
    getAuthor();
    getComments();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ position: "sticky", width: "97%", p: 1.7 }}>
        <Container
          sx={{
            alignItems: "flex-start",
            display: "flex",
            gap: 1.5,
            overflowX: "scroll",
            borderBottom: "1px solid gray",
          }}
        ></Container>
      </Box>
      <Container>
        <Grid container spacing={3}>
          <Grid
            item
            xs={17}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" sx={{ fontStyle: "italic" }}>
                {"Author: @"}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "1000", ml: 2 }}>
                {author + " 😬"}
              </Typography>
            </Box>

            {
              // ovde turi upw i dwnvt
              //   <Grid item xs={1} sx={{ display: "flex" }}>
              //     <Box
              //       sx={{
              //         display: "flex",
              //         flexDirection: "row",
              //         alignItems: "center",
              //       }}
              //     >
              //       <IconButton
              //         sx={{ width: "40px" }}
              //         onClick={() => {
              //           upvote();
              //         }}
              //       >
              //         <ArrowUpwardIcon
              //           color={hasVoted.upvoted ? "success" : "disabled"}
              //         />
              //       </IconButton>
              //       <Typography align="right" variant="subtitle2">
              //         {upvotes}
              //       </Typography>
              //       <IconButton
              //         sx={{ width: "40px" }}
              //         onClick={() => {
              //           downvote();
              //         }}
              //       >
              //         <ArrowDownwardIcon
              //           color={hasVoted.downvoted ? "error" : "disabled"}
              //         />
              //       </IconButton>
              //       <Typography align="right" variant="subtitle2">
              //         {downvotes}
              //       </Typography>
              //       <IconButton sx={{ width: "40px" }}></IconButton>
              //     </Box>
              //   </Grid>
            }
          </Grid>

          {
            <Grid item xs={12} key={id}>
              <PostCard
                text={post.text}
                time={post.time}
                authorID={post.authorID}
                postUpvotes={post.upvotes}
                postDownvotes={post.downvotes}
                postID={post.id}
              />
            </Grid>
            //ovde ide post
          }
        </Grid>
        <Divider style={{ marginTop: 20 }}></Divider>
        <Input
          sx={{ ml: 5, mt: 2.5, fontSize: "14px" }}
          placeholder="Comment... ✒️"
          inputProps={{ "aria-label": "search google maps" }}
          size="big"
          id="new_category_input"
        />
        <IconButton color="secondary" aria-label="add an alarm">
          <AddIcon />
        </IconButton>
        <Divider style={{ marginTop: 20 }}></Divider>
        <Grid item xs={12} key={id} padding={3}>
          {comments == undefined || comments.length == 0 ? (
            <Typography>No comments found 😒</Typography>
          ) : (
            ""
          )}
          {comments != null && (
            <Grid
              container
              spacing={2}
              /*xs={12} md={6} lg={6}*/
            >
              {comments
                //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                .map((card, index) => {
                  const {
                    id,
                    authorID,
                    postID,
                    text,
                    downvotes,
                    upvotes,
                    time,
                  } = card;
                  console.log(card);
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
                        }}
                      >
                        <IconButton
                          sx={{ width: "40px" }}
                          onClick={() => {
                            upvote();
                          }}
                        >
                          <ArrowUpwardIcon
                            color={hasVoted.upvoted ? "success" : "disabled"}
                          />
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
                        <IconButton sx={{ width: "40px" }}></IconButton>
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
                          {card.text}
                        </Typography>
                        <Typography> {card.time.substring(11, 16)}</Typography>
                        <Typography> {card.time.substring(0, 10)}</Typography>
                        <Divider style={{ marginTop: 20 }}></Divider>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
