import React, { useState } from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

export default function WorkExperienceForm() {


    const { values } = useFormikContext();
    //console.log(values);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <WorkRoundedIcon sx={{ mr: 2 }} />
                Work experience
            </Typography>
            <Paper
                sx={{ p: 3, pt: 0, mb: 4 }}
                variant="outlined"
            >
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} >
                        <FieldArray
                            name="experience"
                            render={(arrayHelpers) => (
                                <React.Fragment>
                                    {
                                        //(() => {
                                        //  const fields = []
                                        //for (let index = 0; index < educationCount; index++) {
                                        //fields.push(
                                        values.experience.map((exp, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <CVCard
                                                        name={`experience[${index}]`}
                                                        title="WORK EXPERIENCE"
                                                        type="work"
                                                        onDelete={() => {
                                                            arrayHelpers.remove(index);
                                                        }}
                                                    />
                                                </React.Fragment>
                                            )
                                        })

                                        //);
                                        // }
                                        // return fields;
                                        //})()
                                    }
                                    <Button onClick={() => {
                                        arrayHelpers.push({
                                            title: "",
                                            description: "",
                                            institutionName: "",
                                            fromDate: "",
                                            toDate: ""
                                        });
                                    }
                                    }
                                        variant="outlined"
                                        startIcon={<AddCircleRoundedIcon />}
                                    >
                                        Add experience
                                    </Button>
                                </React.Fragment>

                            )}
                        >

                        </FieldArray>


                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
