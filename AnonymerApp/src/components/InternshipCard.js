import Container from '@mui/material/Container';
import React, { useState } from 'react';
import {
    Button,
    Typography
} from '@mui/material';
import { Paper, CssBaseline, Box, Divider, Grid, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import Avatar from "@mui/material/Avatar";
//import background from "../resources/lbp.jpg";
import { useNavigate } from "react-router-dom";


export default function InternshipCard(props) {
    const navigate = useNavigate();
    return (
        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Paper
                    sx={{ p: 2 }}
                    // style = {{backgroundImage: `url(${background})`}}
                    variant="outlined"

                >



                    <Grid container style={{
                        marginTop: 3,
                        marginLeft: 3, display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",

                        alignItems: "flex-start"
                    }} sx={{ mb: 4 }}>
                        <Typography align="center" sx={{ m: 1, fontWeight: "1000", fontSize: 22 }}> {props.title} </Typography>
                        <Divider style={{ width: "90%" }} />
                        <Typography align="center" sx={{ m: 1 }}> {props.description} </Typography>
                        <Typography align="center" sx={{ m: 1, display: "flex", flexDirection: "row", justifyContent: "center" }}> <QueryBuilderIcon style={{ color: "red", marginRight: 5 }} /> {props.duration + " " + (props.duration > 1 ? "weeks" : "week")}  </Typography>
                        <Typography align="center" sx={{ m: 1, display: "flex", flexDirection: "row", justifyContent: "center" }}> <PaidIcon style={{ color: "red", marginRight: 5 }} /> {props.compensation + " $"}  </Typography>

                        <Grid container style={{ marginTop: 3, display: "flex", flexDirection: "row", justifyContent: "center" }} spacing={3}>
                            {
                                props.skills.map((el, index) => (
                                    <Chip key={index} style={{ marginLeft: 7, marginTop: 7 }} variant="outlined" label={el.name} />

                                ))
                            }
                        </Grid>
                        <Grid container style={{ marginTop: 3, display: "flex", flexDirection: "row", justifyContent: "center" }} spacing={3}>
                            {
                                props.categories.map((el, index) => (
                                    <Chip key={index} style={{ marginLeft: 7, marginTop: 7 }} variant="outlined" label={el.name} />

                                ))
                            }
                        </Grid>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => { if (props.link != undefined) navigate(props.link) }}>View internship</Button>
                    </Grid>



                </Paper>
            </React.Fragment>

        </Container >
    );
}