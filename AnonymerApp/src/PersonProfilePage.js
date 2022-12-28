import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import PostCard from "./components/Feed/PostCard";
import CardMedia from "@mui/material/CardMedia";
import {
    Tabs,
    Tab,
    Typography,
    Avatar,
    Grid,
    Divider,
    useTheme
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PersonProfilePage({ type, reloadHeader }) {

    const theme = useTheme();

    const navigate = useNavigate();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                sx={{ width: 1 }}
            >
                {value === index && (
                    <Box sx={{ p: 3, width: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [info, setInfo] = useState(null);

    const [posts, setPosts] = useState([]);

    const { id } = useParams();

    const getInfo = async () => {
        const response = await fetch("http://localhost:5222/api/Home/GetPersonInfo/"+id);
        if (response.ok) {
            const fetchData = await response.json();
            console.log("Info"+fetchData.username)
            //if (fetchData.cv.education.length > 0) {
            setInfo(fetchData.username);
            //}
        }
    }

    const getPosts = async () => {
        const response = await fetch("http://localhost:5222/api/Home/GetPersonPosts/"+id);
        if (response.ok) {
            const fetchData = await response.json();
            //console.log(fetchData)
            //if (fetchData.cv.education.length > 0) {
            setPosts(fetchData.posts);
            //}
        }
    }

    const update = () => {
        getInfo();
        reloadHeader();
    }

    useEffect(() => {
        getInfo();
        getPosts();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={10}  >
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left" style={{fontWeight: 1000}}>@{info != undefined ? info:""}</Typography>
                    <Typography variant='h5' align="left">Total number of posts: {posts== undefined ? 0 : posts.length}</Typography>
                </Grid>

            </Grid>
            <Divider sx={{ mt: 2, mb: 3 }} >POSTS BY @{info}</Divider>
            <Box >
                
                {posts== undefined || posts.length == 0 ? (<Typography>Currently no posts to display</Typography>) : ""}
                    {posts != null && (
                        <Grid container spacing={2}
                        /*xs={12} md={6} lg={6}*/
                        >

                            {posts
                                //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((post, index) => {
                                    const { id, authorID, categoryID, text, time, upvotes, downvotes } = post;
                                    console.log(post);
                                    return (
                                            // <Grid container style={{ display:"flex", flexDirection:"column", marginBottom:20}}>
                                            //     <Typography style={{ textAlign: "center", textDecoration: 'underline', marginLeft: 20, fontSize: 20, cursor: "pointer" }} onClick={() => { navigate("/PaperInfoPage/" + card.id) }}>{card.title}</Typography>
                                            //     <Typography > {"Description: "}{card.description}</Typography>
                                            //     <Typography > {"Publication date: "}{card.date.substring(0,10)}</Typography>
                                            //     <Divider style={{marginTop:20}}></Divider>
                                            // </Grid>
                                            <Grid item xs={12} key={index}>
                                                <PostCard
                                                    text={post.text}
                                                    time={post.time}
                                                    authorID={post.authorID}
                                                    upvotes={post.upvotes}
                                                    downvotes={post.downvotes}
                                                    postID={post.id}
                                                />
                                            </Grid>
                                          );
                                })}
                        </Grid>
                    )}

            </Box>

        </Container >
    );
}