import { Paper, CssBaseline, Box, Button, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Typography,
    CircularProgress,
    Avatar,
    Grid,
    useTheme
} from '@mui/material';
import ApplicantList from './components/InternshipPage/ApplicantList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SkillChips from './components/InternshipPage/SkillChips';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { NavLink, useParams } from 'react-router-dom';
import TechStack from './components/EmployerInfo/TechStack';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditInternshipDialog from './components/InternshipPage/EditInternship';


export default function EmployerInternsipPage() {

    const theme = useTheme();
    const { id } = useParams();// id internship-a iz URL

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

    const getInternship = async () => {
        const response = await fetch("http://localhost:7240/Internship/GetInternship/" + id, {
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                setInternship(data.internship);
            }
        }
    }

    const handleApply = async () => {
        const response = await fetch("http://localhost:7240/Student/ApplyToInternship/" + id, {
            credentials: "include",
            method: "PUT"
        });
        const data = await response.json();
        if (data.succeeded) {

        } else {
            alert("You have already applied");
        }
        setApplied(true);
    }

    const checkApplication = async () => {
        const response = await fetch("http://localhost:7240/Student/GetApplication/" + id, {
            credentials: "include"
        });
        const data = await response.json();
        if (data.succeeded) {
            setApplied(data.applied);
        }
    }

    const [internship, setInternship] = useState({
        internshipOwner: false,
        id: "",
        title: "",
        location: "",
        description: "",
        duration: 0,
        compensation: 0,
        employerName: "",
        skills: [],
        interviewQuestions: [],
        ratings: [],
        easy: 0,
        veryEasy: 0,
        aboutRight: 0,
        difficult: 0,
        extremelyDifficult: 0,
        categories: [],
        employerId: ""
    })
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        getInternship();
        checkApplication();
    }, []);

    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar src={process.env.PUBLIC_URL + "/resources/" + internship.picture} alt="Logo" sx={{ width: 140, height: 140 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant='h3' align="left">{internship.title}</Typography>

                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <LocationOnIcon style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {internship.location} </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <QueryBuilderIcon style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {internship.duration + " " + (internship.duration > 1 ? "weeks" : "week")}  </Typography>
                    <Typography align="left" sx={{ m: 1, display: "flex", flexDirection: "row" }}> <PaidIcon style={{ color: theme.palette.secondary.main, marginRight: 5 }} /> {internship.compensation + " $"}  </Typography>
                    <SkillChips skills={internship.skills} />
                    <Box sx={{ display: internship.internshipOwner ? "flex" : "none", mt: 2 }}>
                        <EditInternshipDialog
                            currentCompensation={parseInt(internship.compensation)}
                            currentDuration={parseInt(internship.duration)}
                            currentDescription={internship.description}
                            currentTitle={internship.title}
                            internshipId={internship.id}
                            update={getInternship}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Overview" />
                        <Tab label="Applicants" sx={{ display: internship.internshipOwner ? "" : "none" }} />
                        <Tab label="Interview Info" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Typography align="center" style={{ fontSize: 23 }} >
                        <NavLink to={"/Employer/" + internship.employerId} style={{ color: '#f50057' }}>
                            {internship.employerName}
                        </NavLink>
                        {" has listed this internship"}
                    </Typography>
                    {
                        applied ?
                            <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
                                <CheckCircleOutlineRoundedIcon color={"success"} />
                                Applied to this internship
                            </Typography> :
                            <Button
                                variant="contained"
                                sx={{ display: localStorage.getItem("role") === "Student" ? "" : "none" }}
                                onClick={handleApply}
                            >
                                Apply to internship
                            </Button>
                    }
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>INTERNSHIP DESCRIPTION </Divider>
                    <Typography align="center">{internship.description}</Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>CATEGORIES </Divider>
                    <TechStack categories={internship.categories}></TechStack>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ApplicantList internshipSkills={internship.skills.map(s => s.name)} internshipId={id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography style={{ fontSize: 23 }}>Information about the technical interview</Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>INTERVIEW LEVEL</Divider>
                    <Grid style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>

                        <Grid style={{ display: "flex", flexDirection: "column" }}>
                            <Typography> {internship.veryEasy} {internship.veryEasy == 1 ? "person" : "people"} rated the interview as <Button disabled style={{ color: "black", backgroundColor: "#00a572", marginBottom: 3 }}>Very Easy</Button> </Typography>
                            <Typography> {internship.easy} {internship.easy == 1 ? "person" : "people"} rated the interview as <Button disabled style={{ color: "black", backgroundColor: "#c7ea46", marginBottom: 3 }}> Easy</Button> </Typography>
                            <Typography> {internship.aboutRight} {internship.aboutRight == 1 ? "person" : "people"} rated the interview as <Button disabled style={{ color: "black", backgroundColor: "#ffe87c", marginBottom: 3 }}> About Right</Button> </Typography>
                            <Typography> {internship.difficult} {internship.difficult == 1 ? "person" : "people"} rated the interview as <Button disabled style={{ color: "black", backgroundColor: "#f94449", marginBottom: 3 }}> Difficult</Button> </Typography>
                            <Typography> {internship.extremelyDifficult} {internship.extremelyDifficult == 1 ? "person" : "people"} rated the interview as <Button disabled style={{ color: "black", backgroundColor: "#800020", marginBottom: 3 }}> Extremely Difficult</Button> </Typography>
                        </Grid>
                        <Grid style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
                            {
                                (internship.veryEasy == 0 && internship.easy == 0 && internship.difficult == 0 && internship.extremelyDifficult == 0 && internship.aboutRight == 0) ? "" : <Typography style={{ marginBottom: 5 }}>Usually rated as:</Typography>
                            }

                            {
                                (internship.veryEasy == 0 && internship.easy == 0 && internship.difficult == 0 && internship.extremelyDifficult == 0 && internship.aboutRight == 0) ? (<Button disabled variant="outlined" style={{
                                    width: '10em',
                                    height: '2em', fontSize: 26, color: "black", marginBottom: 3
                                }}> No ratings</Button>) :
                                (internship.extremelyDifficult >= internship.easy && internship.extremelyDifficult >= internship.veryEasy && internship.extremelyDifficult >= internship.difficult && internship.extremelyDifficult >= internship.aboutRight) ?
                                <Button disabled style={{
                                                width: '10em',
                                                height: "60%", fontSize: 26, color: "black", backgroundColor: "#800020", marginBottom: 3
                                            }}> Extremely Difficult</Button>
                                : (internship.difficult>=internship.veryEasy && internship.difficult >= internship.aboutRight && internship.difficult>=internship.easy && internship.difficult >=internship.extremelyDifficult) ?
                                    <Button disabled style={{
                                                width: '10em',
                                                height: '2em', fontSize: 26, color: "black", backgroundColor: "#f94449", marginBottom: 3
                                            }}> Difficult</Button>
                                    : (internship.aboutRight>internship.easy && internship.aboutRight>internship.veryEasy && internship.aboutRight > internship.difficult && internship.aboutRight > internship.extremelyDifficult) ?
                                        <Button disabled style={{
                                            width: '10em',
                                            height: '2em', fontSize: 26, color: "black", backgroundColor: "#ffe87c", marginBottom: 3
                                        }}> About Right</Button>
                                        : (internship.easy>=internship.veryEasy && internship.easy>=internship.difficult && internship.easy>=internship.aboutRight && internship.easy >= internship.extremelyDifficult) ?
                                            <Button disabled style={{
                                        width: '10em',
                                        height: '2em', fontSize: 26, color: "black", backgroundColor: "#c7ea46", marginBottom: 3
                                    }}> Easy</Button>
                                            : <Button disabled style={{
                                    width: '10em',
                                    height: '2em', fontSize: 26, color: "black", backgroundColor: "#00a572", marginBottom: 3
                                }}>Very Easy</Button>

                            }
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }}>SHARED INTERVIEW QUESTIONS ({internship.interviewQuestions != undefined ? internship.interviewQuestions.length : "0"})</Divider>
                    {
                        //console.log(internship.interviewQuestions)
                        internship.interviewQuestions != undefined && internship.interviewQuestions.length > 0 ?
                            internship.interviewQuestions.map((el, index) => (
                                <Grid style={{}} key={index}>
                                    <Typography style={{ display: "flex", justifyContent: "center" }}> <LiveHelpIcon sx={{ fontSize: 25 }} style={{ color: "red" }} />
                                        {"   " + (index + 1)}. {" " + el.content}
                                    </Typography>
                                    <Divider style={{ marginTop: 20, marginBottom: 20, }}></Divider>
                                </Grid>
                            )) : <Typography style={{ marginTop: 20, marginBottom: 10 }}>No questions to display</Typography>


                    }
                </TabPanel>


            </Box>

        </Container >
    );
}
