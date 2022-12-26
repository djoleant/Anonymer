import Chip from '@mui/material/Chip';
import { Grid, Typography, Paper, Box } from '@mui/material';
import * as React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';



export default function ChipTransferList({ chipData, leftTitle, rightTitle, fieldName }) {


    const [searchVal, setSearchVal] = React.useState("");
    const { values } = useFormikContext();
    return (
        <FieldArray
            name={fieldName}
            render={(arrayHelpers) => (
                <Grid container spacing={3}>

                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom >
                            {leftTitle}
                        </Typography>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 3,
                                m: 0,
                                width: 1,
                                gap: 1,
                            }}
                            variant="outlined"
                        >
                            <TextField variant={"standard"} fullWidth placeholder='Search'
                                onChange={(event) => { setSearchVal(event.target.value) }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    maxHeight: "200px",
                                    overflowY: "scroll",
                                }}
                            >
                                {chipData
                                    .filter((data) => data.label.toLowerCase().includes(searchVal.toLowerCase()))
                                    .map((data) => {
                                        let icon;

                                        let selected = values[fieldName].find(val => val.id == data.id) != null;

                                        return (
                                            <Chip
                                                key={data.id}
                                                icon={icon}
                                                label={data.label}
                                                onClick={() => {
                                                    if (!selected)
                                                        arrayHelpers.push(data);
                                                }}
                                                variant={selected ? "outlined" : "filled"}

                                            />
                                        );
                                    })
                                }
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Typography gutterBottom >
                            {rightTitle}
                        </Typography>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 3,
                                m: 0,
                                width: 1,
                                gap: 1,
                            }}
                            variant="outlined"
                        >
                            {
                                values[fieldName].map((val, index) => (
                                    <Chip
                                        key={index}
                                        label={val.label}
                                        onDelete={() => { arrayHelpers.remove(index) }}

                                    />
                                ))
                            }
                        </Paper>
                    </Grid>
                </Grid>

            )}
        >

        </FieldArray>
    )
}