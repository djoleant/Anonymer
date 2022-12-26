//to be implemented
import { useState, useEffect } from "react";
import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import ComboBox from "./components/ComboBox";
import StarRateIcon from "@mui/icons-material/StarRate";
import Statistics from "./components/AboutUs/Statistics";
import background from "./resources/stojny.jpg";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {

  const theme = useTheme();
  console.log(theme);

  const getEmployers = async () => {
    const response = await fetch(
      "http://localhost:7240/Employer/GetMostRankedEmployers",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setEmployerData(fetchData.employers);
    }
  };


  const [employerData, setEmployerData] = useState({
    employers: [
      {
        picture: "",
        companyName: "",
        about: "",
        address: "",
        likes: "",
        email: "",
        internshipCount: "",
        ratings: [{ overallScore: "" }]
      },
    ],
  });

  useEffect(() => {
    getEmployers();
  }, []);

  const navigate = useNavigate();


  return (
    <Box
      sx={{
        backgroundImage: theme.palette.mode === 'dark' ?
          "url(" + process.env.PUBLIC_URL + "/images/darkbg.jpg" + ")"
          : "url(" + process.env.PUBLIC_URL + "/images/lightbg.png" + ")"
      }}
    >
      <CssBaseline />
      <React.Fragment>

        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
          <Typography style={{ color: "#618fba", alignSelf: "center", fontSize: 56, fontWeight: 800, marginLeft: 20, marginTop: 20 }}>Intern<span style={{ backgroundColor: "#618fba", color: "white" }}>Clix </span> </Typography>
          <Typography style={{ alignSelf: "center", fontSize: 32, fontWeight: 800, marginLeft: 20, marginTop: 10, marginBottom: 20 }}><SearchIcon size="large" /> Find Your Dream Internship.</Typography>
          <Statistics />
        </Grid>
        <Grid fullwidth style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <Grid fullwidth style={{ display: "flex", flexDirection: "column", backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", marginRight: 10, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
            <Typography fullwidth style={{ fontSize: 20, fontWeight: 1000, backgroundColor: "#f50057", width: "100%" }}> STUDENT </Typography>
            <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={theme.palette.mode === 'dark' ? process.env.PUBLIC_URL + "/images/student2.jpg" : process.env.PUBLIC_URL + "/images/student1.jpg"}
                sx={{ width: 200, height: 200, marginRight: 4, justifySelf: "flex-end" }}
              />
              <Grid style={{ alignSelf: "center", width: "50%", marginTop: 10 }}>
                <Typography style={{ fontSize: 20 }}>Register as a student and: </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • View internship offers </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Chat with employers </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Rate former employers </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • See internship compatibility </Typography>
                <Button size="large" href="http://localhost:3000/Register/student" variant="contained" style={{ marginTop: 40, marginBottom: 20, marginRight: 28 }}>Register as student</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid fullwidth style={{ backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", marginLeft: 10, marginTop: 6, marginBottom: 1, marginRight: 14 }}>
            <Typography fullwidth style={{ fontSize: 20, fontWeight: 1000, backgroundColor: "#618fba", width: "100%" }}> EMPLOYER </Typography>
            <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap-reverse", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Grid style={{ alignSelf: "center", width: "50%", marginBottom: 5, /*backgroundColor:"lightgrey"*/ marginLeft: 20, marginTop: 10 }}>
                <Typography style={{ fontSize: 20 }}>Register as an employer and: </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Post internship offers </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Hire prospective students </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • See your company's ratings </Typography>
                <Typography style={{ marginLeft: 4, fontSize: 18 }}> • Chat with new applicants </Typography>
                <Button size="large" href="http://localhost:3000/Register/employer" variant="contained" style={{ order: 100, backgroundColor: "#f50057", marginTop: 40, marginBottom: 20, marginRight: 12 }}>Register as employer</Button>
              </Grid>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={theme.palette.mode === 'dark' ? process.env.PUBLIC_URL + "/images/employer2.jpg" : process.env.PUBLIC_URL + "/images/employer1.jpg"}
                sx={{ width: 200, height: 200, marginRight: 1, justifySelf: "flex-end" }}
              />

            </Grid>
          </Grid>
        </Grid>
        <Grid fullwidth style={{ marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "10%" }}>
          <Typography style={{ color: "#618fba", fontSize: 20, fontWeight: 800, marginLeft: 20, }}> <InfoIcon></InfoIcon> Already have an account?</Typography>
          <Button size="large" href="http://localhost:3000/SignIn" variant="outlined" style={{ marginLeft: 20 }}>Sign in</Button>
        </Grid>
        <Divider style={{ marginTop: 10, marginBottom: 20 }}></Divider>
        <Typography style={{ fontSize: 26, fontWeight: 1000, marginBottom: 20, backgroundColor: "#f50057", color: "white" }}>Our Best-Rated Employers</Typography>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          {employerData.employers
            .map((card, index) => {

              return (
                <Grid item >
                  <Card key={index} style={{ width: 350, height: 230, cursor: "pointer" }} onClick={() => { navigate("/Employer/" + card.id) }}>

                    <CardMedia />

                    <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "flex-end",
                        height: 200,
                        backgroundImage: `url(${background})`
                      }}
                      spacing={3}

                    >
                      <Button style={{ backgroundColor: "#618fba", height: 32, marginLeft: 30, marginBottom: 30, color: "white" }} disabled> {card.internshipCount} {card.internshipCount == "1" ? "internship" : "internships"} </Button>
                      {
                        (<Button disabled style={{ marginLeft: 5, height: 32, backgroundColor: "white", marginBottom: 30, color: "black" }} >
                          {
                            card.ratings > 0 ? Math.round(card.ratings * 2) / 2 : "0 RATINGS"
                          }
                          {
                            card.ratings > 0 ? (<StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />) : ""
                          }

                        </Button>)
                      }
                      <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={process.env.PUBLIC_URL + "/resources/" + card.picture}
                        sx={{ width: 110, height: 110, marginRight: 1, marginTop: 14, justifySelf: "flex-end" }}
                      />
                    </Grid>
                    <Divider light />
                    <CardActions style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                      <Typography style={{ textAlign: "center", fontWeight: "1000", marginLeft: 7, fontSize: 20 }}><WorkHistoryIcon> </WorkHistoryIcon> {card.companyName}</Typography>
                      {/* <Typography style={{textAlign:"center"}}>{card.about}</Typography> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Grid>
          <Button variant="contained" href="http://localhost:3000/Employers" style={{ marginTop: 20 }}>See All Employers</Button>
        </Grid>
      </React.Fragment>
    </Box>
  );

}