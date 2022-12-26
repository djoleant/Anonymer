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
    useTheme,
    Avatar,
    Tab,
    Tabs,
    Input,
    TextField,
    IconButton,
} from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DraftsIcon from "@mui/icons-material/Drafts";
import ApartmentIcon from "@mui/icons-material/Apartment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TechStack from "./components/EmployerInfo/TechStack";
import InternshipCard from "./components/EmployerInfo/InternshipCard";
import ExperienceCard from "./components/EmployerInfo/ExperienceCard";
import { useParams } from "react-router-dom";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SmallInternshipCard from "./components/StudentProfile/SmallInternshipCard";
import EditEmployerProfileDialog from './components/EmployerInfo/EditEmployer';

export default function EmployerInfoPage(props) {
    const { id } = useParams();
    const theme = useTheme();

    const role = localStorage.getItem("role");

    const [search, setSearch] = useState("");

    const [ratingStatus, setRatingStatus] = useState({
        status: "",
    });

    const navigate = useNavigate();

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
                {value === index && <Box sx={{ p: 3, width: 1 }}>{children}</Box>}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getEmployerInfo = async () => {
        console.log(id)
        const response = await fetch(
            "http://localhost:7240/Employer/GetEmployerInfo" + (id != undefined ? "?employerId=" + id : ""),
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData);
            setEmployerData(fetchData.employer);
        }
    };

    const getRatingStatus = async () => {
        if (role == "Student") {
            const response = await fetch(
                "http://localhost:7240/Employer/GetRatingStatus/" + id,
                {
                    credentials: "include",
                }
            );
            if (response.ok) {
                const fetchData2 = await response.json();
                console.log(fetchData2);
                setRatingStatus(fetchData2.status);
            }
        }
    };

    const getCategoryInfo = async () => {
        //console.log(id)
        const response2 = await fetch(
            "http://localhost:7240/Employer/GetEmployerCategories?employerId=" + (id != undefined ? id : ""),
            {
                credentials: "include",
            }
        );
        if (response2.ok) {
            const fetchData2 = await response2.json();
            console.log(fetchData2);
            setCategoryData(fetchData2.categories);
        }
    };

    //const [skillData, setSkillData] = useState([]);
    const [employerData, setEmployerData] = useState({
        picture: "",
        companyName: "",
        about: "",
        likes: "",
        address: "",
        phoneNumber: "+3816345454",
        email: "",
        internships: [
            {
                id: "",
                title: "",
                description: "",
                compensation: "",
                duration: "",
                skills: [],
            },
        ],
        ratings: [
            {
                id: "",
                overallScore: "",
                benefitsScore: "",
                skillImprovementScore: "",
                positiveExperience: "",
                negativeExperience: "",
                likes: "",
                dislikes: "",
            },
        ],
    });

    const [categoryData, setCategoryData] = useState({
        categories: [{ name: "" }],
    });

    useEffect(() => {
        getEmployerInfo();
        getRatingStatus();
        getCategoryInfo();
    }, []);

    const update = () => {
        getEmployerInfo();
        props.reloadHeader();
    }

    return (
        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    md={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Avatar
                        src={process.env.PUBLIC_URL + "/resources/" + employerData.picture}
                        sx={{ width: 140, height: 140 }}
                    />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Typography variant="h3" align="left">
                        {employerData != undefined ? employerData.companyName : ""}
                        {/* {console.log("Status: "+ratingStatus.status)} */}
                        {role != "Student" || ratingStatus.status !== 1 ? "" : (<Button variant="contained" style={{ marginLeft: "20px" }} onClick={() => { navigate("/EmployerRatingPage/" + id) }}> RATE THIS EMPLOYER </Button>)}
                        {role != "Student" || ratingStatus.status !== -1 ? "" : (<Button disabled variant="contained" style={{ marginLeft: "20px" }}> CAN'T RATE THIS EMPLOYER</Button>)}
                        {/* {role != "Student" ? "" : (<Button variant="contained" style={{ marginLeft: "20px" }} onClick={() => { navigate("/EmployerRatingPage/" + id) }}> RATE THIS EMPLOYER </Button>)} */}
                    </Typography>
                    <Typography align="left">{employerData.about}</Typography>
                    <Box sx={{ display: employerData.id !== localStorage.getItem("id") ? "none" : "flex", mt: 1 }}>
                        <EditEmployerProfileDialog
                            currentPicture={employerData.picture}
                            currentCompanyName={employerData.companyName}
                            currentAbout={employerData.about}
                            currentAddress={employerData.address}
                            update={update}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        position: "sticky",
                        top: 65,
                        mt: 4,
                        zIndex: 20,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Tabs
                        value={value}
                        variant="scrollable"
                        scrollButtons
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Overview" />
                        <Tab label="Internships" />
                        <Tab label="Ratings" />
                        {/* <Tab label="My internships" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Wishlist" sx={{ display: type === "public" ? "none" : "" }} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }}> ABOUT US </Divider>
                        <Typography
                            component="h1"
                            align="center"
                            sx={{ m: 2, color: "#bbbbbb" }}
                        >
                            {employerData.about}
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 5, mb: 3 }}> CONTACT INFO </Divider>
                    <Grid
                        container
                        style={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginLeft: 100,
                        }}
                        spacing={3}
                        sx={{ mb: 4 }}
                    >
                        <Typography align="center" sx={{ m: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            {" "}
                            <ApartmentIcon style={{ color: "red" }} /> {employerData.address}{" "}
                        </Typography>
                        <Typography align="center" sx={{ m: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            {" "}
                            <DraftsIcon style={{ color: "red" }} /> {employerData.email}{" "}
                        </Typography>
                        {/* <Typography align="center" sx={{ m: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            {" "}
                            <PhoneIphoneIcon style={{ color: "red" }} /> {employerData.phoneNumber}{" "}
                        </Typography> */}
                        <Typography align="center" sx={{ m: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            {" "}
                            <PublicIcon style={{ color: "red" }} /> http://{employerData.companyName.toLowerCase()}.com{" "}
                        </Typography>
                    </Grid>
                    <Divider sx={{ mt: 5, mb: 3 }}> SOCIAL MEDIA LINKS </Divider>
                    <Grid
                        container
                        style={{
                            marginTop: 3,
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
                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }}> TECH STACK </Divider>
                        <Grid
                            container
                            style={{
                                marginTop: 3,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                            spacing={3}
                            sx={{ mb: 4 }}
                        >
                            {/* {
                                    categoryData.categories.map(el=>{
                                        (<TechStack categories={el.ime}/>)
                                    })
                                } */}
                            <TechStack categories={categoryData === undefined ? [] : categoryData.categories} />
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                                style={{
                                    width: "80%",
                                    justifySelf: "center",
                                    alignSelf: "center",
                                }}
                                autoFocus
                                key="searchkey"
                                onChange={(event) => { setSearch(event.target.value) }}
                                variant="standard"
                                label="Search"
                                value={search}
                            ></TextField>
                        </Grid>
                        <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
                            <Grid container spacing={3} sx={{ pb: 2 }}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddCircleRoundedIcon />}
                                        sx={{
                                            display:
                                                employerData.id !== localStorage.getItem("id")
                                                    ? "none"
                                                    : "",
                                        }}
                                        onClick={() => navigate("/InternshipCreator")}
                                    >
                                        Post Internship
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* Internship Cards */}
                            {
                                <Grid container spacing={3}>
                                    {employerData.internships
                                        .filter((c) =>
                                            c.title.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((el, index) => (
                                            <Grid item xs={12} md={6} lg={6} key={index}>
                                                <SmallInternshipCard
                                                    title={el.title}
                                                    description={el.description}
                                                    duration={el.duration}
                                                    compensation={el.compensation}
                                                    skills={el.skills}
                                                    link={"/Internship/" + el.id}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            }
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid
                        container
                        style={{
                            marginTop: 3,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            //flexWrap:"wrap"
                        }}
                        spacing={1}
                        sx={{ mb: 2 }}

                    >   {employerData.ratings == undefined || employerData.ratings.length == 0 ? (<Typography>Currently no ratings to display</Typography>) : ""}
                        {employerData.ratings.map((el, index) => (
                            <Grid item xs={12} md={6} lg={6} key={index}>
                                <ExperienceCard
                                    id={el.id}
                                    overallScore={el.overallScore}
                                    benefitsScore={el.benefitsScore}
                                    skillImprovementScore={el.skillImprovementScore}
                                    positiveExperience={el.positiveExperience}
                                    negativeExperience={el.negativeExperience}
                                    recommended={el.recommended}
                                    likes={el.likes}
                                    dislikes={el.dislikes}
                                    key={index}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
            </Box>
            {/* <React.Fragment>
                <Paper
                    sx={{ p: 3, mb: 4, mt: 4 }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                        {employerData.companyName}
                    </Typography>



                    <Box sx={{ mb: 3 }} variant="outlined">




                        <Box sx={{ mb: 3 }} variant="outlined">
                            <Divider sx={{ mt: 5, mb: 3 }} > SHARED RATINGS </Divider>

                        </Box>

                    </Box>

                </Paper>

            </React.Fragment> */}
        </Container>
    );
}
