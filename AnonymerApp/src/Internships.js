import React, { useState, useEffect } from 'react';
import { Paper, CssBaseline, Box, Divider, Grid, Container, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from '@mui/material/colors';
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import ComboBox from './components/ComboBox';
import { useNavigate } from "react-router-dom";
import InternshipCard from './components/InternshipCard';
import background from "./resources/stojny.jpg";
import SmallInternshipCard from './components/StudentProfile/SmallInternshipCard';


export default function Internships(props) {

    const [internshipData, setInternshipData] = useState(null);

    const [backgroundColor, setColor] = useState("blue");


    const getInternships = async () => {
        const response = await fetch(
            "http://localhost:7240/Internship/GetInternships",
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setInternshipData(fetchData.internships);
        }
    };

    const [search, setSearch] = useState("");

    useEffect(() => {
        getInternships();
        console.log("a");
    }, []);

    console.log(internshipData);

    const navigate = useNavigate();



    // const [cards, setCards] = React.useState([card]);


    return (

        <>
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                    justifyContent="center"

                >
                    <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Grid container xs={12} md={6} lg={6} style={{ display: "flex", flexDirection: "row", padding: "10px", width: "90%", justifyContent: "center", alignItems: "center" }}>
                            <TextField style={{ marginBottom: 5 }}
                                onChange={(event) => { setSearch(event.target.value) }}
                                id="outlined-basic-email"
                                label="Search by internship name"
                                variant="outlined"
                                fullWidth
                            />



                        </Grid>

                    </Grid>




                    {internshipData != null && (
                        <Grid container spacing={2}
                        /*xs={12} md={6} lg={6}*/
                        >

                            {internshipData.internships
                                .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((cards, index) => {
                                    const { title, description, duration, compensation, skills, categories, id, address, wishlisted, picture, companyName } = cards;
                                    console.log(cards);
                                    return (
                                        <Grid item xs={12} md={6} lg={4}>
                                            <SmallInternshipCard
                                                index={index}
                                                title={title}
                                                description={description}
                                                duration={duration}
                                                compensation={compensation}
                                                skills={skills}
                                                categories={categories}
                                                link={"/Internship/" + id}
                                                location={address}
                                                showBookmark={localStorage.getItem("role") === "Student"}
                                                wishlisted={wishlisted}
                                                internshipID={id}
                                                picture={picture}
                                                companyName={companyName}
                                            />
                                        </Grid>

                                    );
                                })}
                        </Grid>
                    )}


                </Paper>

            </React.Fragment>

        </ >
    );
}