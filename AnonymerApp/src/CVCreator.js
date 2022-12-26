import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { Formik, Form } from 'formik';
import PersonalInfoForm from './components/CVForms/PersonalInfoForm';
import ProfessionalSkillsForm from './components/CVForms/ProfessionalSkillsForm';
import WorkExperienceForm from './components/CVForms/WorkExperienceForm';
import AdditionalInfoForm from './components/CVForms/AdditionalInfoForm';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';




//import { theme, useStyle } from './styles';
const steps = ['Personal info', 'Professional skills', "Work experience", 'Aditional info'];



export default function CVCreator() {
    //const { children } = props;
    //const classes = useStyle();
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <PersonalInfoForm />
            case 1:
                return <ProfessionalSkillsForm skillData={skillData} />;
            case 2:
                return <WorkExperienceForm />;
            case 3:
                return <AdditionalInfoForm />;
            default:
                return <React.Fragment>Not Found</React.Fragment>;
        }
    }

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    //const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        // await _sleep(1000);
        // console.log(JSON.stringify(values, null, 2));
        // actions.setSubmitting(false);

        // setActiveStep(activeStep + 1);
        // alert("Objekat je u console log")
        const response = await fetch("http://localhost:7240/CV/CreateCV", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        actions.setSubmitting(false);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setActiveStep(activeStep + 1);
        }
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    const getSkills = async () => {
        const response = await fetch("http://localhost:7240/CV/GetSkills", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            setSkillData(fetchData.skills);
        }

    }

    const getCvData = async () => {
        const response = await fetch("http://localhost:7240/CV/GetCV", {
            credentials: "include",
            method: "POST"
        });
        if (response.ok) {
            const fetchData = await response.json();
            if (fetchData.cv.education.length > 0)
                setCvData(fetchData.cv);
        }

    }

    const [skillData, setSkillData] = useState([]);
    const [cvData, setCvData] = useState({
        title:"",
        phone: "",
        address: "",
        city: "",
        education: [
            //{ title: "", description: "", institutionName: "", fromDate: "", toDate: "" }
        ],
        skills: [],
        categories: [],
        languages: [
            //{ title: "", description: "" }
        ],
        experience: [
            // { title: "", description: "", institutionName: "", fromDate: "", toDate: "" }
        ],
        additionalInfo: []
    });

    const cvValidationSchema = Yup.object().shape({
        phone: Yup.string().required("Your phone number is required"),
        address: Yup.string().required("Your address is required"),
        city: Yup.string().required("The city is required is required"),
        education: Yup.array()
            .of(
                Yup.object()
                    .shape({
                        title: Yup.string().required("The title of your education is required"),
                        institutionName: Yup.string().required("The name of the institution is required"),
                        fromDate: Yup.string().required("The date is required"),
                        toDate: Yup.string().required("The date is required")
                    })),
        languages: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required("The name of the language is required"),
                    description: Yup.string().required("The level is required")
                })
            ),
        experience: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required("The position is required"),
                    institutionName: Yup.string().required("The name of the company is required"),
                    fromDate: Yup.string().required("The date is required"),
                    toDate: Yup.string().required("The date is required")
                })
            ),
        additionalInfo: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required("The title of the additional information is required"),
                    description: Yup.string().required("The description is required"),
                    type: Yup.string().required("The type of the additional information is required")
                })
            )
    })

    useEffect(() => {
        getSkills();
        getCvData();
    }, []);

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    CV Creator
                </Typography>
                <Stepper activeStep={activeStep} >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {
                                    <Typography sx={{
                                        display: { xs: 'none', md: "block" },
                                    }}>
                                        {label}
                                    </Typography>
                                }
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <>
                            <Typography component="h1" variant="h2" align="center">
                                <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: 100, mt: 10 }} />
                                <br />
                                CV successfully created
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 7, fontSize: 20, textDecoration: "none" }}
                                onClick={() => { navigate("/CVGenerator") }}
                            >
                                View CV
                            </Button>
                        </>
                    ) : (
                        <Formik
                            initialValues={
                                cvData
                            }
                            enableReinitialize
                            validationSchema={cvValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"cvForm"}>
                                    {_renderStepContent(activeStep)}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            mb: 5
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} variant="outlined" size="large" >
                                                Back
                                            </Button>
                                        )}
                                        <div >
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                            // onClick={() => {
                                            //     if (!isLastStep) {
                                            //         setActiveStep(activeStep + 1)
                                            //     }
                                            // }}
                                            >
                                                {isLastStep ? 'Save changes' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{ ml: 4 }}

                                                />
                                            )}
                                        </div>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>

        </Container >
    );
}
