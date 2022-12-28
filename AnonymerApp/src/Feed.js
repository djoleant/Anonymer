import { Paper, IconButton, Divider, InputBase, Box, Chip, Container, Grid, CssBaseline, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, Directions as DirectionsIcon, AddCircle as SearchIcon } from "@mui/icons-material";
import PostCard from "./components/Feed/PostCard";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Feed() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(-1);

    const getCategories = async () => {
        const result = await fetch("http://localhost:5222/api/Home/GetCategories");
        const data = await result.json();
        setCategories(data.categories);
        if (data.categories.length > 0) {
            setSelectedCategory(data.categories[data.categories.length - 1].id);
            getPosts(data.categories[data.categories.length - 1].id);
        }
    }

    const getPosts = async (categoryID) => {
        const result = await fetch("http://localhost:5222/api/Home/GetCategoryPosts/" + categoryID);
        const data = await result.json();
        setPosts(data.posts);
        console.log(posts);
    }

    const getUsername = async () => {
        const resp = await fetch("http://localhost:5222/api/Home/GetUsername/" + localStorage.getItem("userID"));
        const data = await resp.json();
        setUsername(data.username);
    }

    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
        getUsername();
    }, []);

    const [username, setUsername] = useState("");

    return (
        <>
            <CssBaseline />
            <Box
                sx={{ position: "sticky", width: "97%", p: 1.7 }}
            >
                <Container sx={{ alignItems: "flex-start", display: "flex", gap: 1.5, overflowX: "scroll", borderBottom: "1px solid gray" }}>
                    {
                        categories.map(category => (
                            <Chip
                                label={category.name}
                                key={category.id}
                                variant={category.id == selectedCategory ? "outlined" : "filled"}
                                sx={{ cursor: "pointer" }}
                                onClick={() => { setSelectedCategory(category.id); getPosts(category.id); }}
                            />
                        ))
                    }
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 150, height: "32px" }}
                        variant="outlined"
                    >

                        <InputBase
                            sx={{ ml: 1, flex: 1, mt: 0.5, fontSize: "14px" }}
                            placeholder="New Category"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            size="small"
                            id="new_category_input"
                        />
                        <IconButton type="button" sx={{ height: "30px" }} aria-label="search"
                            onClick={() => {
                                //console.log(document.getElementById("new_category_input").value)
                                const catName = document.getElementById("new_category_input").value;
                                if (catName == null || catName == undefined || catName == "")
                                    return;
                                fetch("http://localhost:5222/api/Home/CreateCategory/" + encodeURIComponent(catName), {
                                    method: "POST"
                                })
                                    .then(resp => {
                                        if (resp.ok) {
                                            getCategories();
                                            document.getElementById("new_category_input").value = "";
                                        }
                                    })
                            }}
                        >
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex" }}>
                            <Typography variant="h3" sx={{ fontStyle: "italic" }}>{"Welcome, "}</Typography>
                            <Typography variant="h3" sx={{ fontWeight: "1000", ml: 2 }}>{" @" + username + " 😄"}</Typography>
                        </Box >
                        <Button size="large" variant="outlined" onClick={() => { navigate("/AddPost") }} sx={{ mr: 2, mt: 2 }}>Write something </Button>
                    </Grid>

                    {
                        posts.length > 0 ?
                            posts.map((post, index) => (
                                <Grid item xs={12} key={index}>
                                    <PostCard
                                        text={post.text}
                                        time={post.time}
                                        authorID={post.authorID}
                                        postUpvotes={post.upvotes}
                                        postDownvotes={post.downvotes}
                                        postID={post.id}
                                    />
                                </Grid>
                            )) :
                            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 5 }}>
                                <Typography variant="h4">Looks like there are no posts in this category... 🙄</Typography>
                            </Box >
                    }
                </Grid >
            </Container>
        </>
    )
}