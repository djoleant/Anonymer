import React, { useState } from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function AdditionalInfoForm() {


    const { values } = useFormikContext();
    //console.log(values);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <InfoRoundedIcon sx={{ mr: 2 }} />
                Additional info
            </Typography>
            <Paper
                sx={{ p: 3, pt: 0, mb: 4 }}
                variant="outlined"
            >
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} >
                        <FieldArray
                            name="additionalInfo"
                            render={(arrayHelpers) => (
                                <React.Fragment>
                                    {
                                        //(() => {
                                        //  const fields = []
                                        //for (let index = 0; index < educationCount; index++) {
                                        //fields.push(
                                        values.additionalInfo.map((inf, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <CVCard
                                                        name={`additionalInfo[${index}]`}
                                                        title="ADDITIONAL INFO"
                                                        type="additional"
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
                                            type: ""

                                        });
                                    }

                                    }
                                        variant="outlined"
                                        startIcon={<AddCircleRoundedIcon />}
                                        sx={{ mt: (values.additionalInfo.length == 0) ? 5 : 0 }}
                                    >
                                        Add info
                                    </Button>
                                </React.Fragment>

                            )}
                        >

                        </FieldArray>


                    </Grid>
                </Grid>
            </Paper >
        </React.Fragment >
    );
}
