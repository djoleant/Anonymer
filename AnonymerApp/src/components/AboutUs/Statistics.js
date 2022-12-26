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
  Chip,
  Link
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
import ApartmentIcon from '@mui/icons-material/Apartment';
import StarIcon from '@mui/icons-material/Star';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';

export default function AboutUsPage(props) {

    const getStatistics = async () => {
        const response = await fetch(
          "http://localhost:7240/Employer/GetStatistics",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const fetchData = await response.json();
          console.log(fetchData);
          setStatisticsData(fetchData.statistics);
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
    
      useEffect(() => {
        getStatistics();
      }, []);

    return (
        <Container component="main" >
        <CssBaseline />
        <React.Fragment>
            <Paper
                sx={{ p: 3, mb: 1, mr:4 }}
                variant="outlined"
                style={{opacity: 0.8}}
            >
            <Grid container style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <ApartmentIcon fontSize="large"></ApartmentIcon>
                    <Typography style={{fontSize:28, fontWeight:"bolder"}}>{statisticsData.employerCount}</Typography>
                    <Typography style={{ fontSize:16}}>registered employer{statisticsData.employerCount==1?"":"s"}</Typography>
                </Grid>
                {/* <Divider style={{marginLeft:20, marginRight:20}} orientation="vertical" flexItem/> */}
                <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",/* border:"1px solid black", padding:"20px"*/}}>
                    <StarIcon fontSize="large"></StarIcon>
                    <Typography style={{/*color:"#618fba"*/ fontSize:28, fontWeight:"bolder"}}>{statisticsData.ratingCount}</Typography>
                    <Typography>employer rating{statisticsData.ratingCount==1?"":"s"}</Typography>
                </Grid>
                {/* <Divider style={{marginLeft:20, marginRight:20}} orientation="vertical" flexItem/> */}
                <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", /*border:"1px solid black", padding:"20px"*/}}>
                    <WorkHistoryIcon fontSize="large"></WorkHistoryIcon>
                    <Typography style={{ fontSize:28, fontWeight:"bolder"}}>{statisticsData.internshipCount}</Typography>
                    <Typography>internship offer{statisticsData.internshipCount==1?"":"s"}</Typography>
                </Grid>
                {/* <Divider style={{marginLeft:20, marginRight:20}} orientation="vertical" flexItem/> */}
                <Grid style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <SchoolIcon fontSize="large"></SchoolIcon>
                    <Typography style={{fontSize:28, fontWeight:"bolder"}}>{statisticsData.studentCount}</Typography>
                    <Typography>registered student{statisticsData.employerCount==1?"":"s"}</Typography>
                </Grid>
            </Grid>

            </Paper>
            </React.Fragment>
        </Container>
    );
}