import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Grid,
    Paper,
    Divider
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

export default function AddPostPagePage(props) {
    const theme = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const getCategories = async () => {
        const response = await fetch(
            "http://localhost:5222/api/Home/GetCategories",
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            setCategoryData(fetchData.categories);
        }
    };

    async function _submitForm(values, actions) {

        const response = await fetch("http://localhost:5222/api/Home/CreatePost/" + content + "/" + localStorage.getItem("userID") + "/" + intQ, {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            //navigate("/SuccessRating");
            setSubmitted("yes");
        }
    }

    const [categoryData, setCategoryData] = useState([]);

    //localStorage.setItem("userID", "3");
    useEffect(() => {
        getCategories();
    }, []);

    const handleIntQChange = (event) => {
        setintQ(event.target.value);
    }

    const [submitted, setSubmitted] = useState("no");

    const [textValue, setTextValue] = useState("");

    const [intQ, setintQ] = useState(0);

    const [content, setContent] = useState("");

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");


    const handleContentChange = (event) => {
        setContent(event.target.value);
        console.log(event.target.value);
    }
    
    if(submitted=="no")
        return (
        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                        Create a <span style={{ color: 'red', fontWeight: 'bold' }}>new post </span> ! 
                    </Typography>
                </Paper>
                <Paper
                    sx={{ p: 3, mb: 2 }}
                    variant="outlined"
                >
                    <Grid container style={{ alignItems: "center", justifyContent: "center" }} spacing={3} sx={{ mb: 3 }}>

                        <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Choose a category </Typography>
                            <Select fullWidth style={{ marginLeft: 4, marginRight: 6 }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={intQ}
                                onChange={handleIntQChange}
                            >
                                {(categoryData != undefined) ?
                                    categoryData.map((el, index) => (
                                        <MenuItem key={index} value={el.id}>{el.name}</MenuItem>
                                    )) : ""
                                }
                            </Select>

                        </Grid>
                    </Grid>
                        <br></br>
                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 2, mb: 3 }} >POST CONTENT</Divider>
                        <Grid container spacing={3} sx={{ mb: 4 }}>

                            <Grid item xs={12}>
                                <TextField type="name" name={"content"} label={"Input text here"} onChange={(event) => handleContentChange(event)} fullWidth multiline rows={4} />
                            </Grid>

                        </Grid>
                        <Button onClick={_submitForm}
                            variant="contained" endIcon={<SendIcon />}> Submit new post </Button>
                    </Box >
                    
                    
                </Paper>

            </React.Fragment>
        </Container>
    );
    else return(
        <Typography component="h1" variant="h2" align="center">
            <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: 100, mt: 10 }} />
            <br />
            Post successfully created
            <br />
            <Button variant="contained" href={"http://localhost:3000/PersonProfile/"+localStorage.getItem("userID")} style={{marginTop:30, backgroundColor:"#f50057"}}>VIEW POST ON PROFILE</Button>
        </Typography>

    );
}