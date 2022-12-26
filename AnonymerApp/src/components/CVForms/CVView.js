import React, { useEffect, useState, createRef } from 'react';
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Divider,
    Box,
    Chip,
    ThemeProvider,
    createTheme,
    Backdrop,
    CircularProgress
} from '@mui/material';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const studentInfo = {
    name: "Name",
    lastName: "Lastname",
    picture: ""
}



const calculateColor = (c) => {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >> 8) & 0xff;  // extract green
    var b = (rgb >> 0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 70) {
        return "white";
    }
    return "black";
}

export default function CVView({ refProp, displayOrder, accentColor, cvFont, displayIcons }) {
    //const ref = createRef();

    const theme = createTheme({
        typography: {
            fontFamily: cvFont
        },
        // palette: {
        //     mode: "dark"
        // }
    })

    const [info, setInfo] = useState({
        name: "Name",
        lastName: "Lastname",
        email: "student@example.com",
        city: "City",
        address: "Street Name 99",
        phone: "+3812345678",
        picture: "",
        skills: [
            { id: 1, label: "React" },
            { id: 2, label: ".NET" },
            { id: 3, label: "Angular" },
            { id: 4, label: "Node.js" },
            { id: 5, label: "Python" }
        ],
        languages: [
            { title: "Language 1", description: "Description1" },
            { title: "Language 2", description: "Description2" },
            { title: "Language 3", description: "Description3" },
        ],
        education: [
            { title: "School 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 1", fromDate: "1.1.2020.", toDate: "1.1.2021." },
            { title: "School 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 2", fromDate: "1.1.2020.", toDate: "1.1.2021." },
            { title: "School 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." }
        ],
        experience: [
            { title: "Work 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 1", fromDate: "1.1.2020.", toDate: "1.1.2021." },
            { title: "Work 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 2", fromDate: "1.1.2020.", toDate: "1.1.2021." },
            { title: "Work 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." },
            { title: "Work 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", institutionName: "subtitle 3", fromDate: "1.1.2020.", toDate: "1.1.2021." }
        ],
        additionalInfo: [
            { title: "Project 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", type: "Projects" },
            { title: "Project 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", type: "Projects" },
            { title: "Membership 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", type: "Memberships" },
            { title: "Something 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat vitae odio ut hendrerit. Nullam auctor non leo vel consectetur. Donec mi dolor, feugiat eu dolor ornare, accumsan luctus dolor.", type: "Something" }
        ]
    })

    const [loading, setLoading] = useState(true);

    const getInfo = async () => {
        const response = await fetch("http://localhost:7240/CV/GetCV", {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
            if (fetchData.cv.education.length > 0) {
                console.log(fetchData.cv);
                setInfo(fetchData.cv);
                setLoading(false)
            }
        }

    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper sx={{ p: 3, width: 950, borderRadius: 0 }} variant="outlined" ref={refProp}>
                <Grid container spacing={3} sx={{ backgroundColor: accentColor, borderRadius: "0px 0px 200px 0px", color: calculateColor(accentColor) }} >
                    <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Avatar src={process.env.PUBLIC_URL + "/resources/" + info.picture} sx={{ width: 200, height: 200 }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='h2' align="left">{info.name + " " + info.lastName}</Typography>
                        <Divider sx={{ mb: 1, mt: 1 }}></Divider>
                        <Typography variant='h6' align="left">{info.title}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={4} sx={{ backgroundColor: accentColor, pr: 3, pb: 5, borderRadius: "0px 0px 200px 0px", color: calculateColor(accentColor) }}>
                        <Box >
                            <Divider sx={{ mb: 5, mt: 10 }} >
                                <Typography variant='h6'>CONTACT INFO</Typography>
                            </Divider>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <LocalPhoneRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />{info.phone}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmailRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />{info.email}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <HomeRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />{info.address + ", " + info.city}
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 5, mt: 10 }}>
                                <Typography variant='h6'>SKILLS</Typography>
                            </Divider>
                            <Box sx={{ display: "flex", /*flexDirection: "column",*/ justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                                {
                                    info.skills.map((skill, index) => (
                                        <Chip label={skill.label} key={index} sx={{ color: calculateColor(accentColor) }} />
                                    ))

                                }
                            </Box>
                            <Divider sx={{ mb: 5, mt: 10 }}>
                                <Typography variant='h6'>LNAGUAGES</Typography>
                            </Divider>
                            {
                                info.languages.map((lang, index) => (
                                    <Box sx={{ display: "flex" }} key={index}>
                                        <Typography sx={{ fontWeight: "bold", display: "flex" }} >
                                            {lang.title}  -
                                        </Typography>
                                        <Typography>{lang.description}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item container xs={8} >
                        <Box sx={{ width: 20, height: 20, backgroundColor: accentColor, ml: -4 }}></Box>
                        <Box sx={{ width: 20, height: 20, backgroundColor: "white", ml: -1.5, borderRadius: "16px 0 0 0" }}></Box>

                        {
                            renderWorkExperience(displayOrder, displayIcons)
                        }

                    </Grid>
                    {
                        renderWorkExperience(displayOrder == "work" ? "education" : "work", displayIcons)
                    }
                    {
                        info.additionalInfo
                            .map(el => el.type)
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((type, index) => (
                                <Grid item xs={12} key={index}>
                                    <Divider sx={{ mb: 3, mt: 3 }}>
                                        <Typography variant='h6' sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                                            {renderIcon(type, displayIcons)}
                                            {type.toUpperCase()}

                                        </Typography>
                                    </Divider>
                                    {
                                        info.additionalInfo
                                            .filter(info => info.type == type)
                                            .map((info, index) => (

                                                <Grid item xs={12} sx={{ mb: 3, pl: 4, pr: 4 }} key={index}>
                                                    <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{info.title}</Typography>
                                                    <Divider ></Divider>
                                                    <Typography align="left">{info.description}</Typography>
                                                </Grid>
                                            ))
                                    }
                                </Grid>
                            ))

                    }
                </Grid>

            </Paper >
        </ThemeProvider >
    )

    function renderWorkExperience(order, displayIcons = true) {
        return (
            order == "work" ? (
                <Grid item xs={12}>
                    <Divider sx={{ mb: 3, mt: 3 }}>
                        <Typography variant='h6' sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <WorkRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />WORK EXPERIENCE
                        </Typography>
                    </Divider>
                    {
                        info.experience.map((edu, index) => (
                            <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                                <Grid item xs={2}>
                                    <Typography sx={{ fontWeight: "bold" }} >
                                        {(new Date(edu.fromDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) + " -"}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold" }} >
                                        {(new Date(edu.toDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} sx={{ mb: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                    <Divider ></Divider>
                                    <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                    <Typography align="left">{edu.description}</Typography>
                                </Grid>
                            </Grid>
                        ))
                    }

                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Divider sx={{ mb: 3, mt: 3 }}>
                        <Typography variant='h6' sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <SchoolRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />EDUCATION
                        </Typography>
                    </Divider>
                    {
                        info.education.map((edu, index) => (
                            <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                                <Grid item xs={2}>
                                    <Typography sx={{ fontWeight: "bold" }} >
                                        {(new Date(edu.fromDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) + " -"}
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold" }} >
                                        {(new Date(edu.toDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} sx={{ mb: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                    <Divider ></Divider>
                                    <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                    <Typography align="left">{edu.description}</Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>

            )
        )
    }
}

function renderIcon(infoType, displayIcons = true) {
    infoType = infoType.toLowerCase();
    if (infoType.includes("project")) {
        return <IntegrationInstructionsRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />
    } else if (infoType.includes("member")) {
        return <AssignmentIndRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />
    } else {
        return <InfoRoundedIcon sx={{ display: (displayIcons) ? "auto" : "none" }} />
    }
}

