import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Radio,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RadioGroup from '@mui/material/RadioGroup';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HoverRating from './components/EmployerInfo/HoverRating';

export default function EmployerRatingPage(props) {
    const theme = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const getPrevInternships = async () => {
        console.log("ID" + id)
        const response = await fetch(
            "http://localhost:7240/Employer/GetEmployerInternships/" + id,
            {
                credentials: "include",
            }
        );
        if (response.ok) {
            const fetchData = await response.json();
            //console.log(fetchData);
            setEmployerData(fetchData.internships);
        }
    };

    async function _submitForm(values, actions) {

        const response = await fetch("http://localhost:7240/Employer/AddRating/" + skillImprovement + "/" + benefits + "/" + overall + "/" + experienceP + "/" + experienceN + "/" + recommend + "/" + jobInterview + "/" + genImpression + "/" + durationSel + "/" + id, {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // if (response.ok) {
        //     const data = await response.json();
        //     console.log(data);
        //     navigate("/SuccessRating");
        // }

        var qs = "";//="[";
        questionList.forEach((element, index) => {
            qs += element.question;
            (index != questionList.length - 1) ? qs += ",\n" : qs += "";
        });
        //qs+="]";
        console.log(qs);

        const response2 = await fetch("http://localhost:7240/Internship/AddQuestions/" + intQ, {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionList.map(q => q.question))
        })
        if (response2.ok && response.ok) {
            const data = await response2.json();
            console.log(data);
            navigate("/SuccessRating");
        }
        //console.log(skillImprovement, benefits, overall, genImpression, jobInterview, durationSel,experienceP,experienceN, recommend)
    }

    const [employerData, setEmployerData] = useState({
        employer: "",
        internships: [
            {
                internshipID: "",
                title: "",
            },
        ],
    });

    const [questionsData, setQuestionData] = useState({
        internshipId: 0,
        questions: [],
    });

    useEffect(() => {
        getPrevInternships();
    }, []);


    const [textValue, setTextValue] = useState("");

    const [questionList, setquestionList] = useState([{ question: "" }]);

    const [experienceP, setPExperience] = useState("Cool");

    const [experienceN, setNExperience] = useState("Not cool");

    const [durationSel, setDurationSel] = useState(0);

    const [genImpression, setGenImpression] = useState("Neutral");

    const [recommend, setRecommend] = useState(true);

    const [intQ, setintQ] = useState(0);

    const [jobInterview, setJobInterview] = useState("Easy");

    const [skillImprovement, setSkillImprovement] = useState(2.5);

    const [benefits, setBenefits] = useState(2.5);

    const [overall, setOverall] = useState(2.5);

    //console.log(jobInt);

    // const getEmployerRating = async () => {
    //     const response = await fetch(
    //         "http://localhost:7240/Employer/AddRating/" + skillImprovement+"/"+benefits+"/"+overall+"/"+positiveExperience+"/"+negativeExperience+"/"+recommend+"/"+jobInt+"/"+genImpression+"/"+durationSel+"/"+id,
    //         {
    //             credentials: "include",
    //         }
    //     );
    //     if (response.ok) {
    //         const fetchData = await response.json();
    //         console.log(fetchData);
    //         //setEmployerData(fetchData.employer);
    //     }
    // };

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleSubmit = () => console.log(textValue);
    const handleReset = () => setTextValue("");

    const handleQuestionAdd = () => {
        setquestionList([...questionList, { question: "" }])
    }

    console.log(questionList);

    const handleQuestionRemove = (index) => {
        const list = [...questionList];
        list.splice(index, 1);
        setquestionList(list);
    }

    const handleQuestionChange = (event, index) => {
        const { value, name } = event.target;
        const list = [...questionList];
        list[index][name] = value;
        setquestionList(list);
    }

    const handlePExperienceChange = (event) => {
        setPExperience(event.target.value);
    }
    const handleNExperienceChange = (event) => {
        setNExperience(event.target.value);
    }

    const handleDurationSelChange = (event) => {
        setDurationSel(event.target.value);
    }

    const handleIntQChange = (event) => {
        setintQ(event.target.value);
    }

    const handleGenImpressionChange = (event) => {
        setGenImpression(event.target.value);
    }

    const handleRecommendChange = (event) => {
        setRecommend(event.target.value);
    }

    const handleJobInterviewChange = (event) => {
        setJobInterview(event.target.value);
    }

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Rate your internship experience
                </Typography>
                <Paper
                    sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
                        Leave a public rating of your former employer in <span style={{ color: 'red', fontWeight: 'bold' }}> a matter of minutes! </span> The experience you share will prove valuable for other internship seekers looking for work!
                    </Typography>
                </Paper>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >
                    <Grid container style={{ alignItems: "center", justifyContent: "center" }} spacing={3} sx={{ mb: 3 }}>

                        <Typography variant="h5" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                            <StarHalfIcon sx={{ mr: 2 }} />
                            Internship experience @ {employerData.employer}
                        </Typography>


                        <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Choose one of your previous internships </Typography>
                            <Select fullWidth style={{ marginLeft: 4, marginRight: 6 }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={intQ}
                                onChange={handleIntQChange}
                            >
                                {(employerData.internships != undefined) ?
                                    employerData.internships.map((el, index) => (
                                        <MenuItem key={index} value={el.internshipID}>{el.title}</MenuItem>
                                    )) : ""
                                }
                            </Select>

                        </Grid>
                    </Grid>

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} >JOB INTERVIEW AND SELECTION PROCESS</Divider>

                        <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}> General impression of the job interview? </Typography>
                            <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={genImpression}
                                    onChange={handleGenImpressionChange}
                                >
                                    <Grid style={{ display: "inline-block" }}>
                                        <FormControlLabel value="Positive" control={<Radio onChange={handleGenImpressionChange} />} label="Positive" />
                                        <FormControlLabel value="Neutral" control={<Radio onChange={handleGenImpressionChange} />} label="Neutral" />
                                        <FormControlLabel value="Negative" control={<Radio onChange={handleGenImpressionChange} />} label="Negative" />
                                    </Grid>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Typography component="subtitle1" align="center" sx={{ m: 2 }}> How would you rate the difficulty of the job interview? </Typography>
                                <Select fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={jobInterview}
                                    onChange={handleJobInterviewChange}
                                >
                                    <MenuItem value={"Very Easy"}>Very Easy</MenuItem>
                                    <MenuItem value={"Easy"}>Easy</MenuItem>
                                    <MenuItem value={"About Right"}>About right</MenuItem>
                                    <MenuItem value={"Difficult"}>Difficult</MenuItem>
                                    <MenuItem value={"Extremely difficult"}>Extremely difficult</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <br></br>
                        <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> How many weeks did the selection process last? </Typography>
                            <TextField onChange={(event) => handleDurationSelChange(event)} name={"durationSel"} label={"Duration of selection process"} fullWidth />

                        </Grid>

                    </Box >

                    <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }} style={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}
                        variant="outlined">
                        <Typography align="center" sx={{ m: 2 }}> <LightbulbCircleIcon style={{ color: "red" }} /> Remeber any interview questions? Please do share! </Typography>
                        {
                            questionList.map((singleQuestion, index) => (
                                <Grid>
                                    {(questionList.length == 1) ?
                                        (
                                            <Grid style={{ display: "flex", flexDirection: "row" }}>
                                                <TextField name={"question"} value={singleQuestion.question} onChange={(event) => handleQuestionChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"Enter new interview question"} fullWidth />
                                            </Grid>
                                        ) :
                                        (
                                            <Grid style={{ display: "flex", flexDirection: "row" }}>
                                                <TextField name={"question"} value={singleQuestion.question} onChange={(event) => handleQuestionChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"Enter new interview question"} fullWidth />
                                                <IconButton aria-label="delete" onClick={() => handleQuestionRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>

                                        )}

                                    {(questionList.length - 1 === index) ?
                                        (
                                            <Grid>
                                                <Button onClick={handleQuestionAdd} variant="contained" sx={{ mt: 2 }} startIcon={<AddBoxIcon />} > Add Question</Button>
                                            </Grid>
                                        ) : ""}
                                </Grid>
                            ))
                        }

                    </Paper>

                    <Box sx={{ mb: 3 }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} >BRIEF SUMMARY OF YOUR EXPERIENCE WITH THE COMPANY</Divider>
                        <Grid container spacing={3} sx={{ mb: 4 }}>

                            <Grid item xs={12}>
                                <TextField type="name" name={"positiveExperience"} label={"Positive experience"} onChange={(event) => handlePExperienceChange(event)} fullWidth multiline rows={4} />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField type="name" name={"negativeExperience"} label={"Negative experience"} onChange={(event) => handleNExperienceChange(event)} fullWidth multiline rows={4} />
                            </Grid>
                        </Grid>


                    </Box >
                    <Box sx={{ mb: 3, position: "relative" }} variant="outlined">
                        <Divider sx={{ mt: 5, mb: 3 }} > RATINGS </Divider>
                        <Grid container xs={12} style={{ alignItems: "center", justifyContent: "center" }} >
                            <Typography sx={{ m: 2 }}> Skill improvement </Typography>
                            <HoverRating value={skillImprovement} onChange={(e) => { setSkillImprovement(parseFloat(e.target.value)) }} />

                        </Grid>
                        <Grid container xs={12} style={{ alignItems: "center", justifyContent: "center" }}>
                            <Typography sx={{ m: 2 }}> Company Benefits </Typography>
                            <HoverRating value={benefits} onChange={(e) => { setBenefits(parseFloat(e.target.value)) }} />
                        </Grid>
                        <Grid container xs={12} style={{ alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Overall Company Rating </Typography>
                            <HoverRating value={overall} onChange={(e) => { setOverall(parseFloat(e.target.value)) }} />
                        </Grid>
                        <Divider sx={{ mt: 5, mb: 3 }} > FINAL VERDICT </Divider>
                        <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography align="center" sx={{ m: 2 }}> Would you recommend this internship? </Typography>
                            <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={recommend}
                                    onChange={handleRecommendChange}
                                >
                                    <Grid container style={{ alignItems: "center", justifyContent: "center" }}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </Grid>

                                </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Button onClick={_submitForm}
                            variant="contained" endIcon={<SendIcon />}> Submit rating </Button>
                    </Box>
                </Paper>

            </React.Fragment>
        </Container>
    );
}