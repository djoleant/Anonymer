import { Button, Card, Box, Typography, Grid, IconButton, Avatar } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SkillChips from "../InternshipPage/SkillChips";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommentIcon from '@mui/icons-material/ModeComment';

export default function PostCard({
    text = "Text...",
    upvotes = 0,
    downvotes = 0,
    time,
    maxWidth = "100%",
    authorID,
    postID
}) {

    const navigate = useNavigate();

    const getDateString = (time) => {
        const date = new Date(time);
        return date.toLocaleString();
    }

    const getUserPostInfo = async () => {
        const resp = await fetch("http://localhost:5222/api/Home/HasUserVoted/" + localStorage.getItem("userID") + "/" + postID);
        const data = await resp.json();
        setHasVoted(data);
    }

    const getAuthor = async () => {
        const resp = await fetch("http://localhost:5222/api/Home/GetUsername/" + authorID);
        const data = await resp.json();
        setAuthor(data.username);
    }

    useEffect(() => {
        getUserPostInfo();
        getAuthor();
    }, []);

    const [hasVoted, setHasVoted] = useState({ upvoted: false, downvoted: false });
    const [author, setAuthor] = useState("");

    return (
        <Card variant="outlined" sx={{ p: 3, maxWidth: maxWidth }}>
            <Grid container>
                <Grid item xs={1} sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <IconButton
                            sx={{ width: "40px" }}
                        >
                            <ArrowUpwardIcon color={hasVoted.upvoted ? "success" : "disabled"} />
                        </IconButton>
                        <Typography align="right" variant="subtitle2">{upvotes}</Typography>
                        <IconButton
                            sx={{ width: "40px" }}
                        >
                            <ArrowDownwardIcon color={hasVoted.downvoted ? "error" : "disabled"} />
                        </IconButton>
                        <Typography align="right" variant="subtitle2">{downvotes}</Typography>
                        <IconButton
                            sx={{ width: "40px" }}
                        >
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid container item xs={11}>

                    <Grid item xs={12}>
                        <Typography variant="body1" align="left">{text}</Typography>
                    </Grid>



                </Grid>

            </Grid>

            {
                (time != undefined) ?
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pl: 11 }}>
                        <Typography align="right" variant="subtitle2">{"Author: " + author}</Typography>
                        <Typography align="right" variant="subtitle2">{getDateString(time)}</Typography>
                    </Box>
                    :
                    <></>
            }
        </Card>
    )
}