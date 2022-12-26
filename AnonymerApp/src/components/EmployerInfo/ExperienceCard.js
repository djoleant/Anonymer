import Container from "@mui/material/Container";
import React, { useState } from "react";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { Button, Typography } from "@mui/material";
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import Star from "@mui/icons-material/Star";

export default function ExperienceCard(props) {
  const theme = useTheme();
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 2, ml: 1, mb: 2 }} variant="outlined">
          <Grid
            container
            style={{
              marginTop: 1,
              marginLeft: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "space-around",
              justifyContent: "space-around"
            }}
            spacing={2}

          >
            {/* <Typography     align="center" sx={{ m: 1, fontWeight:"1000" }}> Random Internship Title </Typography>
                            <Typography     align="center" sx={{ m: 1 }}>  Location </Typography>
                            <Typography     align="center" sx={{ m: 1 }}>  Duration </Typography>      */}
            <Grid
              container
              style={{
                marginTop: 1,
                marginLeft: 3,

                //backgroundColor:"red"
              }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Typography
                variant="h5" align="left" style={{ marginBottom: 4 }}
              >
                Rating #{props.id}{" "}
              </Typography>
              {props.recommended == true ? (
                <Button align="right" variant="outlined" disabled style={{ display: "flex", flexDirection: "row", marginLeft: 30, marginBottom: 3 }}>
                  <ThumbUpIcon
                    style={{ marginLeft: 3, color: "green", fontWeight: 200 }}
                  ></ThumbUpIcon>
                  <Typography
                    style={{
                      marginLeft: 5,
                      color: "green",
                      fontWeight: "400",
                    }}
                  >
                    {" "}
                    Recommends{" "}
                  </Typography>
                </Button>
              ) : (
                <Button variant="outlined" align="right" disabled style={{ display: "flex", flexDirection: "row", justifySelf: "flex-end", marginLeft: 30, marginBottom: 3 }}>
                  <ThumbDownIcon
                    style={{ color: "red" }}
                  ></ThumbDownIcon>
                  <Typography
                    style={{ marginLeft: 2, color: "red", fontWeight: 400 }}
                  >
                    {" "}
                    Doesn't Recommend{" "}
                  </Typography>
                </Button>
              )}
              <Divider style={{ width: '88%', marginBottom: 7 }} />
              <Grid
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                  borderRadius: 10,
                  marginLeft: 50
                }}
              >
                <Grid>
                  {/* <Typography style={{ marginRight: 10, marginTop: 6 }}>
                    Was this rating helpful? {"  "}
                  </Typography>
                </Grid>
                <Typography>
                  {props.likes}{" "}
                  <IconButton color="primary" aria-label="add an alarm">
                    <ThumbUpIcon />
                  </IconButton>
                </Typography>
                <Typography>
                  {props.dislikes}{" "}
                  <IconButton color="primary" aria-label="add an alarm">
                    <ThumbDownIcon />
                  </IconButton>
                </Typography> */}
                </Grid>
              </Grid>

              <Grid
                container
                style={{
                  marginTop: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justofyContent: "center",
                }}
                spacing={3}
                sx={{ mb: 2, pl: 2 }}
              >
                <Grid
                  container
                  style={{
                    marginTop: 1,
                    marginLeft: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justofyContent: "flex-start",
                  }}
                  spacing={3}
                  sx={{ mb: 3.5, pl: 2 }}
                >
                  <Button
                    style={{
                      width: 60,
                      marginLeft: 7,
                      marginRight: 20,
                      marginTop: 1,

                    }}
                    variant="contained"
                    disabled
                  >
                    {props.skillImprovementScore}{" "}
                    <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                  </Button>
                  <Typography>Skill improvement Score</Typography>
                </Grid>
                <Grid
                  container
                  style={{
                    marginLeft: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justofyContent: "flex-start",
                  }}
                  spacing={3}
                  sx={{ mb: 3.5, pl: 2 }}
                >
                  <Button
                    style={{
                      width: 60,
                      marginLeft: 7,
                      marginRight: 20,
                      marginTop: 1,

                    }}
                    variant="contained"
                    disabled
                  >
                    {props.benefitsScore}{" "}
                    <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                  </Button>
                  <Typography>Company Benefits Score</Typography>
                </Grid>
                <Grid
                  container
                  style={{
                    marginLeft: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justofyContent: "flex-start",
                  }}
                  spacing={3}
                  sx={{ mb: 2, pl: 2 }}
                >
                  <Button
                    style={{
                      width: 60,
                      marginLeft: 7,
                      marginRight: 20,
                      marginTop: 1,
                    }}
                    variant="contained"
                    disabled
                  >
                    {props.overallScore}{" "}
                    <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                  </Button>
                  <Typography>Overall Company Score</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                style={{
                  marginLeft: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                spacing={3}
                sx={{ mb: 1 }}
              >
                <Divider style={{ width: "90%" }}></Divider>
                <Typography

                  align="center"
                  sx={{ m: 1, fontWeight: "1000" }}
                >
                  {" "}
                  POSITIVE EXPERIENCE{" "}
                </Typography>
                <Typography align="center" sx={{ m: 1 }}>
                  {" "}
                  {props.positiveExperience}{" "}
                </Typography>

                <Typography

                  align="center"
                  sx={{ m: 1, fontWeight: "1000" }}
                >
                  {" "}
                  NEGATIVE EXPERIENCE{" "}
                </Typography>
                <Typography align="center" sx={{ m: 1 }}>
                  {" "}
                  {props.negativeExperience}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
