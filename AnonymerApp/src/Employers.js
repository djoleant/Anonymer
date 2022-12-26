import React, { useState, useEffect } from "react";
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
import background from "./resources/stojny.jpg";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useNavigate } from "react-router-dom";

export default function Employers(props) {

  const [search, setSearch] = useState("");

  const [backgroundColor, setColor] = useState("blue");

  const getEmployers = async () => {
    const response = await fetch(
      "http://localhost:7240/Employer/GetEmployers",
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

  const getStatistics = async () => {
    const response = await fetch(
      "http://localhost:7240/Employer/GetStatistics",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData2 = await response.json();
      console.log(fetchData2);
      setStatisticsData(fetchData2.statistics);
    }
  };

  const getRankedEmployers = async () => {
    const response = await fetch(
      "http://localhost:7240/Employer/GetRankedEmployers",
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

  const [statisticsData, setStatisticsData] = useState({
    statistics: [
      {
        employerCount: "",
        ratingCount: "",
        internshipCount: "",
        studentCount: ""
      },
    ],
  });

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
    getStatistics();
    getEmployers();
  }, []);

  const navigate = useNavigate();

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">

          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* <ComboBox /> */}
            <Grid item xs={12} style={{ padding: "10px", maxWidth: 500 }}>
              <TextField
                onChange={(event) => { setSearch(event.target.value) }}
                id="outlined-basic-email"
                label="Search by employer name"
                variant="outlined"
                fullWidth
              />
              <style>
                {
                  `
              .red {color: red}
              .blue {background-color: "#618fba"}
            `
                }
              </style>
              <Button variant="outlined" className={backgroundColor} onClick={() => { setColor((backgroundColor) => backgroundColor === "blue" ? "red" : "blue"); if (backgroundColor === "blue") { getRankedEmployers(); } else { getEmployers(); } }} style={{ justifySelf: "flex-start", marginTop: 10, marginRight: 10, fontWeight: 500 }}>  SORT{(backgroundColor === "blue") ? "" : "ED"} BY NUMBER OF INTERNSHIPS </Button>
              {/* <Button style={{justifySelf:"flex-start", marginTop:10}}>  SORT BY EMPLOYER RATING </Button> */}
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 2, mb: 3 }}> {statisticsData.employerCount} EMPLOYER{statisticsData.employerCount == 1 ? "" : "S"} </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >

            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {employerData.employers
              .filter(c => c.companyName.toLowerCase().includes(search.toLowerCase()))
              .map((card, index) => {

                return (
                  <Grid item key={index}>
                    <Card style={{ width: 380, height: 230,cursor:"pointer" }} onClick={() => { navigate("/Employer/" + card.id) }}>

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
                              card.ratings.length > 0 ? card.ratings.reduce((acc, current) => acc += current.overallScore, 0) / card.ratings.length : "0 RATINGS"
                            }
                            {
                              card.ratings.length > 0 ? (<StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />) : ""
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
        </Paper>
      </React.Fragment>
    </Container>
  );
}
