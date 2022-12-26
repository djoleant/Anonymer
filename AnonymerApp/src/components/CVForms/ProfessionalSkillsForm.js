import { Grid, Typography, Button, Divider, Box } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextInputField from '../CVFormFields/TextInputField';
import CVCard from './CVCard';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ChipTransferList from './ChipTransferList';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function ProfessionalSkillsForm({ skillData }) {

    // const [skillData/*, setChipData*/] = React.useState([ //ucitavanje iz baze
    //     { id: 0, label: 'Angular' },
    //     { id: 1, label: 'jQuery' },
    //     { id: 2, label: 'Polymer' },
    //     { id: 3, label: 'React' },
    //     { id: 4, label: 'Vue.js' },
    //     { id: 5, label: 'Angular' },
    //     { id: 6, label: 'jQuery' },
    //     { id: 7, label: 'Polymer' },
    //     { id: 8, label: 'React' },
    //     { id: 9, label: 'Vue.js' },
    //     { id: 10, label: 'Angular' },
    //     { id: 11, label: 'jQuery' },
    //     { id: 12, label: 'Polymer' },
    //     { id: 13, label: 'React' },
    //     { id: 14, label: 'Vue.js' },
    //     { id: 15, label: 'Angular' },
    //     { id: 16, label: 'jQuery' },
    //     { id: 17, label: 'Polymer' },
    //     { id: 18, label: 'React' },
    //     { id: 19, label: 'Vue.js' }
    // ]);

    const { values } = useFormikContext();

    const [categoryData/*, setChipData*/] = React.useState([ //ucitavanje iz baze
        { id: 0, label: 'Web developer' },
        { id: 1, label: 'Artificial Intelligence' },
        { id: 2, label: 'DevOps' },
        { id: 3, label: 'Software Quality Assurance Specialist' },
        { id: 4, label: 'Title1' },
        { id: 5, label: 'Title2' },
        { id: 6, label: 'Title3' },
        { id: 7, label: 'Title4' }

    ]);


    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <MiscellaneousServicesRoundedIcon sx={{ mr: 2 }} />
                Profesional skills
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <Divider sx={{ mb: 3 }} >SKILLS</Divider>
                        <ChipTransferList chipData={skillData} leftTitle={"Choose skills:"} rightTitle={"My skills:"} fieldName={"skills"} />
                        <Divider sx={{ mt: 5, mb: 3 }} >CV TITLE</Divider>
                        <TextInputField name={`title`} label={"CV Title"} fullWidth />
                        <Divider sx={{ mt: 5, mb: 3 }} >LANGUAGES</Divider>
                        <FieldArray
                            name="languages"
                            render={(arrayHelpers) => (
                                <>
                                    {
                                        values.languages.map((language, index) => (
                                            <Grid container spacing={3} key={index} sx={{ mb: 3 }}>

                                                <Grid item md={4} xs={12}>
                                                    <TextInputField name={`languages[${index}].title`} label={"Language"} fullWidth />
                                                </Grid>
                                                <Grid item md={7} xs={10}>
                                                    <TextInputField name={`languages[${index}].description`} label={"Level"} fullWidth />
                                                </Grid>
                                                <Grid item md={1} xs={2} sx={{ mb: 5 }}>
                                                    <Tooltip title="Delete" placement="top" arrow>
                                                        <IconButton aria-label="delete" color="error" onClick={() => { arrayHelpers.remove(index) }}
                                                            //sx={{ mr: -2 }}
                                                            edge="start"
                                                            size="large"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                    <Button onClick={() => {
                                        arrayHelpers.push({
                                            title: "",
                                            description: "",
                                        });
                                    }
                                    }
                                        variant="outlined"
                                        startIcon={<AddCircleRoundedIcon />}
                                    >
                                        Add language
                                    </Button>
                                </>


                            )}
                        ></FieldArray>
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}
