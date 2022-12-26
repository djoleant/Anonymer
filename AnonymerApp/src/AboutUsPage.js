//to be implemented
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
  Link,
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
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Statistics from "./components/AboutUs/Statistics";

export default function AboutUsPage(props) {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4, mt: 2 }} variant="outlined">
          {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Search" variant="outlined" />

                </Box> */}

          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 40, color: "#bbbbbb" }}
            >
              GET TO KNOW{" "}
              <Link style={{ color: "#618fba", textDecoration: "none" }}>
                INTERNCLIX
              </Link>
            </Typography>
          </Grid>
          <Grid>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 28, color: "#bbbbbb" }}
            >
              And the team behind it
            </Typography>
          </Grid>

          {/* <Box alignItems="center"
                    justifyContent="center">
                    <ComboBox />
                </Box> */}

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHO ARE WE? </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >
              InternClix is beautiful. InternClix is beautiful. InternClix is
              beautiful. InternClix is beautiful. InternClix is beautiful.
              InternClix is beautiful. InternClix is beautiful. InternClix is
              beautiful. InternClix is beautiful. InternClix is beautiful.
              InternClix is beautiful. InternClix is beautiful.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHAT DO WE OFFER? </Divider>

            <Chip sx={{ m: 1 }} label="FIND INTERNSHIPS" />
            <Chip sx={{ m: 1 }} label="SHARE WORK EXPERIENCES" />
            <Chip sx={{ m: 1 }} label="RATE FORMER EMPLOYERS" />
            <Chip sx={{ m: 1 }} label="CREATE AND EXPORT A CV" />
            <Chip sx={{ m: 1 }} label="EXPLORE OFFERS" />
            <Chip sx={{ m: 1 }} label="FIND EMPLOYEES" />
            <Chip sx={{ m: 1 }} label="HIRE STUDENTS" />
            <Chip sx={{ m: 1 }} label="RATE INTERNSHIPS" />
            <Chip sx={{ m: 1 }} label="CHAT WITH EMPLOYERS" />
            <Chip sx={{ m: 1 }} label="SEE INTERNSHIP COMPATIBILITY" />
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHO ARE OUR TEAM MEMBERS? </Divider>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Grid
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: "#f50057",
                  }}
                >
                  Head Back Developer
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/estojny.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  style={{
                    fontWeight: 1000,
                    fontSize: 19,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  Emilija Ćojbašić
                </Typography>
                <Typography>
                  Emilija is one of the three lead developers of InternClix. She
                  has been a valuable member of the RuntimeTerror team since it
                  first started out in 2022.
                </Typography>
                <Grid
                  container
                  style={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <FacebookIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <InstagramIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <TwitterIcon />{" "}
                  </Button>
                </Grid>
              </Grid>
              <Divider
                style={{ marginLeft: 20, marginRight: 20 }}
                orientation="vertical"
                flexItem
              />
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: "#f50057",
                  }}
                >
                  Team Leader
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/djstojny.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  style={{
                    fontWeight: 1000,
                    fontSize: 19,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  Djordje Antić
                </Typography>
                <Typography>
                  Djordje is one of the three lead developers of InternClix. He
                  has been a valuable member of the RuntimeTerror team since it
                  first started out in 2022.
                </Typography>
                <Grid
                  container
                  style={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <FacebookIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <InstagramIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <TwitterIcon />{" "}
                  </Button>
                </Grid>
              </Grid>
              <Divider
                style={{ marginLeft: 20, marginRight: 20 }}
                orientation="vertical"
                flexItem
              />
              <Grid
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    marginBottom: 5,
                    fontWeight: "bold",
                    color: "#f50057",
                  }}
                >
                  Head Front Developer
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/mstojny.jpg"}
                  sx={{ width: 100, height: 100 }}
                />
                <Typography
                  style={{
                    fontWeight: 1000,
                    fontSize: 19,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  {" "}
                  Matija Špeletić
                </Typography>
                <Typography>
                  Matija is one of the three lead developers of InternClix. He
                  has been a valuable member of the RuntimeTerror team since it
                  first started out in 2022.
                </Typography>
                <Grid
                  container
                  style={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <FacebookIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <InstagramIcon />{" "}
                  </Button>
                  <Button
                    sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
                    variant="contained"
                    href="https://yahoo.com"
                  >
                    {" "}
                    <TwitterIcon />{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 3 }}>
              {" "}
              WHAT ARE THE PLATFORM STATISTICS?{" "}
            </Divider>
            <Grid
              container
              style={{
                marginTop: 3,
                marginLeft: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Statistics />
            </Grid>

            <Divider sx={{ mt: 5, mb: 3 }}>
              {" "}
              WANT TO REACH US ON SOCIAL MEDIA?{" "}
            </Divider>
            <Grid
              container
              style={{
                marginTop: 3,
                marginLeft: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <FacebookIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <InstagramIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <TwitterIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <LinkedInIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <YouTubeIcon />{" "}
              </Button>
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
