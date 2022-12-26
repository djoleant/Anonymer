import { Checkbox, FormGroup, FormControlLabel, Chip, Button, Grid, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import MatchPercentage from "./MatchPercentage";
import ApplicantInfo from "./ApplicantInfo";
import Slider from "./Slider";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SkillChips from "./SkillChips";


export default function ApplicantList({ internshipId, internshipSkills }) {

    const [applicants, setApplicants] = useState([ //dobija se iz fetcha na osnovu internshipId
        // {
        //     id: "abcd123", name: "Name1", lastName: "Lastname1", match: 95,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }, { id: 3, label: "Angular" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd124", name: "Name2", lastName: "Lastname2", match: 85,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd125", name: "Name3", lastName: "Lastname3", match: 75,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd126", name: "Name4", lastName: "Lastname4", match: 65,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd127", name: "Name5", lastName: "Lastname5", match: 55,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd128", name: "Name6", lastName: "Lastname6", match: 45,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd129", name: "Name7", lastName: "Lastname7", match: 35,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd128", name: "Name6", lastName: "Lastname6", match: 25,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // },
        // {
        //     id: "abcd129", name: "Name7", lastName: "Lastname7", match: 15,
        //     skills: [{ id: 1, label: "React" }, { id: 2, label: ".NET" }], languages: [{ name: "English" }, { name: "Spanish" }]
        // }
    ]);

    const [minMatch, setMinMatch] = useState(0);
    const [sortDirection, setSortDirection] = useState("none");
    const [searchVal, setSearchVal] = useState("");
    const [accepted, setAccepted] = useState(true);
    const [applied, setApplied] = useState(true);
    const [denied, setDenied] = useState(true);
    const [finished, setFinished] = useState(false);

    const getApplicants = async () => {
        const response = await fetch("http://localhost:7240/Internship/GetAppliedStudents/" + internshipId, {
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                console.log(data)
                setApplicants(data.internship.applicants);
            }
        }
    }

    useEffect(() => {
        getApplicants();
    }, [])

    applicants.map((applicant, index) => {
        let metRequirements = 0;
        internshipSkills.forEach(skill => {
            if (applicant.skills.map(s => s.label).includes(skill)) {
                metRequirements++;
            }
        });
        applicant.match = (metRequirements / internshipSkills.length) * 100;
    })

    const navigate = useNavigate();

    return (
        <Grid container sx={{ width: 1 }}>
            {
                applicants.length == 0 ?
                    <Typography>No applicants</Typography> :
                    <Grid item container xs={12} spacing={3}>
                        <Grid item md={3} xs={6}>
                            <Typography>Min. match percentage:</Typography>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Slider defaultValue={0} valueLabelDisplay="on" onChange={(e, value) => { setMinMatch(value) }} />
                        </Grid>
                        <Grid item md={4} xs={8}>
                            <TextField
                                variant="standard"
                                label="Search"
                                sx={{ mt: -3, ml: 4, pr: 4 }}
                                onChange={(e) => { setSearchVal(e.target.value) }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={2} xs={4}>
                            <Button
                                endIcon={
                                    sortDirection == "desc" ?
                                        <ArrowDownwardRoundedIcon /> :
                                        sortDirection == "asc" ?
                                            <ArrowUpwardRoundedIcon /> : <></>
                                }
                                onClick={() => {
                                    if (sortDirection == "desc") setSortDirection("asc");
                                    else if (sortDirection == "asc") setSortDirection("none");
                                    else setSortDirection("desc");
                                }}
                            >
                                Sort
                            </Button>
                        </Grid>
                        <Grid item container xs={12} spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                            <FormGroup row sx={{ gap: 3 }}>
                                <FormControlLabel control={<Checkbox checked={applied} onChange={() => { setApplied(!applied) }} />} label="Applied" />
                                <FormControlLabel control={<Checkbox checked={accepted} onChange={() => { setAccepted(!accepted) }} />} label="Accepted" />
                                <FormControlLabel control={<Checkbox checked={denied} onChange={() => { setDenied(!denied) }} />} label="Denied" />
                                <FormControlLabel control={<Checkbox checked={finished} onChange={() => { setFinished(!finished) }} />} label="Finished" />
                            </FormGroup>
                        </Grid>

                    </Grid>
            }

            <Grid item container xs={12}>

                {
                    applicants
                        .filter((a) =>
                            a.match >= minMatch &&
                            (a.name + " " + a.lastName).toLowerCase().includes(searchVal.toLowerCase())
                        )
                        .filter((a) => (a.status == "Accepted" && accepted)
                            || (a.status == "Applied" && applied)
                            || (a.status == "Denied" && denied)
                            || (a.status == "Finished" && finished)
                        )
                        .sort((a1, a2) => (sortDirection == "desc") ? a2.match - a1.match : (sortDirection == "asc") ? a1.match - a2.match : 0)
                        .map((applicant, index) => (
                            <Accordion variant="outlined" sx={{ width: 1 }} key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
                                        <Typography>
                                            {applicant.name + " " + applicant.lastName}
                                        </Typography>
                                        <Box sx={{ width: "25%" }}>
                                            {
                                                applicant.status == "Applied" ?
                                                    <MatchPercentage value={applicant.match} /> :
                                                    <Chip
                                                        label={applicant.status}
                                                        color={
                                                            applicant.status == "Accepted" ? "success" :
                                                                applicant.status == "Denied" ? "error" :
                                                                    "primary"
                                                        }
                                                        variant="outlined"
                                                    />
                                            }
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ApplicantInfo
                                        internshipSkills={internshipSkills}
                                        applicant={applicant}
                                        remove={getApplicants}
                                    />
                                </AccordionDetails>
                            </Accordion >
                        ))

                }


            </Grid>

        </Grid>
    )
}