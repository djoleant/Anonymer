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
import AboutForm from './components/InternshipForms/AboutForm';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import Requirements from './components/InternshipForms/Requirements';




//import { theme, useStyle } from './styles';
const steps = ['About', 'Submit'];



export default function InternshipCreator() {

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <AboutForm />
            case 1:
                return <React.Fragment>By submitting new internship on InternClix platform you are obligated to follow the terms of use.</React.Fragment>;
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
        console.log(values);
        const response = await fetch("http://localhost:7240/Internship/PostInternship", {
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
            console.log(values);
            console.log(actions);
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

    // const [skillData, setSkillData] = useState([]);
    const [internshipData, setInternshipData] = useState({
        title: "",
        description: "",
        duration: "",
        compensation: "",
        skills: [],
        categories: []
    });


    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Create new internship
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
                            
                        </>
                    ) : (
                        <Formik
                            initialValues={
                                internshipData
                            }
                            enableReinitialize
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"internshipForm"}>
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

                                            >
                                                {isLastStep ? 'Submit' : 'Next'}
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
