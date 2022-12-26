import { Button, Divider, Grid, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import SkillChips from "../InternshipPage/SkillChips";
import AddressIcon from '@mui/icons-material/HomeRounded';
import PhoneIcon from '@mui/icons-material/PhoneRounded';
import LanguageIcon from '@mui/icons-material/LanguageRounded';
import SkillIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import TitleIcon from '@mui/icons-material/TitleRounded';


export default function CVInfo({ cvInfo, type }) {

    const [info, setInfo] = useState(cvInfo ?? {
        name: "Name",
        lastName: "Lastname",
        email: "student@example.com",
        city: "City",
        address: "Street Name 99",
        phone: "+3812345678",
        picture: "",
        title: "This is a title",
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
    });
    const navigate = useNavigate();


    return (
        <Grid container sx={{ width: 1 }}>

            <Grid item container xs={12} sx={{ mb: 3 }}>

                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Basic info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            type === "public" ? <></> :
                                <>
                                    <Typography align="left" ml={4} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                        <AddressIcon />
                                        {"Address:"}
                                    </Typography>
                                    <Typography align="left" ml={7} >{info.address + ", " + info.city}</Typography>
                                    <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                                        <PhoneIcon />
                                        {"Phone:"}
                                    </Typography>
                                    <Typography align="left" ml={7} >{info.phone}</Typography>
                                </>
                        }
                        <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                            <TitleIcon />
                            {"CV Title:"}
                        </Typography>
                        <Typography align="left" ml={7} >{info.title}</Typography>
                        <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                            <LanguageIcon />
                            {"Languages:"}
                        </Typography>
                        {
                            info.languages.map((lang, index) => (
                                <Typography key={index} align="left" ml={7} >
                                    {lang.title + " - " + lang.description}
                                </Typography>
                            ))
                        }
                        <Typography align="left" ml={4} mt={2} sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                            <SkillIcon />
                            {"Skills:"}
                        </Typography>
                        <Box sx={{ ml: 7, mt: 1 }}>
                            <SkillChips skills={info.skills.map(s => ({ name: s.label }))} variant="outlined" />

                        </Box>
                    </AccordionDetails>
                </Accordion >
                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            info.education.map((edu, index) => (
                                <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                                    <Grid item xs={12} md={2}>
                                        <Typography sx={{ fontWeight: "bold" }} >
                                            {(new Date(edu.fromDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) + " - "}
                                            {(new Date(edu.toDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={10} sx={{ mb: 3 }}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                        <Divider ></Divider>
                                        <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                        <Typography align="left">{edu.description}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </AccordionDetails>
                </Accordion >
                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Work experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            info.experience.map((edu, index) => (
                                <Grid container item xs={12} key={index} sx={{ pl: 2 }}>
                                    <Grid item md={2} xs={12}>
                                        <Typography sx={{ fontWeight: "bold" }} >
                                            {(new Date(edu.fromDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) + " - "}
                                            {(new Date(edu.toDate)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={10} xs={12} sx={{ mb: 3 }}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{edu.title}</Typography>
                                        <Divider ></Divider>
                                        <Typography variant="h6" align="left">{edu.institutionName}</Typography>
                                        <Typography align="left">{edu.description}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
                <Accordion variant="outlined" sx={{ width: 1 }} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Additional info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            info.additionalInfo
                                .map((info, index) => (

                                    <Grid item xs={12} sx={{ mb: 3, pl: 4, pr: 4 }} key={index}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }} align="left">{info.title}</Typography>
                                        <Divider ></Divider>
                                        <Typography align="left">{info.description}</Typography>
                                    </Grid>
                                ))
                        }
                    </AccordionDetails>
                </Accordion>

            </Grid>
            {
                type === "public" ? <></> :
                    <Grid item container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => { navigate("/CVCreator") }}
                            >Modify CV</Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => { navigate("/CVGenerator") }}
                            >Export CV</Button>
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}