import React, { useState } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

export default function PersonalInfoForm() {


    const { values } = useFormikContext();
    //console.log(values);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <AccountCircleRoundedIcon sx={{ mr: 2 }} />
                Personal info
            </Typography>
            <Paper
                sx={{ p: 3, mb: 4 }}
                variant="outlined"
            >
                <Divider sx={{ mb: 3 }} >CONTACT INFO</Divider>
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"address"} label={"Address"} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputField name={"city"} label={"City"} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputField type="tel" name={"phone"} label={"Phone number"} fullWidth />
                    </Grid>


                    <Grid item xs={12} >
                        <FieldArray
                            name="education"
                            render={(arrayHelpers) => (
                                <React.Fragment>
                                    {
                                        //(() => {
                                        //  const fields = []
                                        //for (let index = 0; index < educationCount; index++) {
                                        //fields.push(
                                        values.education.map((edu, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <CVCard
                                                        name={`education[${index}]`}
                                                        title="EDUCATION"
                                                        type="education"
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
                                        Add education
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
