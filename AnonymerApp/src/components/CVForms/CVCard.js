import { Box, Autocomplete, Grid, Divider } from "@mui/material";
import TextInputField from "../CVFormFields/TextInputField";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';




const additionalInfoTypes = ["Projects", "Memberships", "Volunteering", "Courses"];

export default function CVCard(props) {
    const { name, title, type, onDelete } = props;
    return (
        <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 5, mb: 3 }} >
                <Tooltip title="Delete" placement="top" arrow>
                    <IconButton aria-label="delete" color="error" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                {title}

            </Divider>

            <Grid container spacing={3}>
                {
                    (type == "work") ? (
                        <>

                            <Grid item xs={12}>
                                <TextInputField name={name + ".title"} label={"Position*"} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".institutionName"} label={"Company name*"} fullWidth />
                            </Grid>
                        </>
                    ) : (type == "education") ? (
                        <>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".title"} label={"Level of education*"} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".institutionName"} label={"Name of the Institution*"} fullWidth />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".type"} label="Type" placeholder="Type (Projects,Memberships...)" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField name={name + ".title"} label={"Title*"} fullWidth />
                            </Grid>
                        </>
                    )
                }
                {
                    (type != "additional") ? (
                        <>
                            <Grid item xs={6}>
                                <TextInputField type="date" name={name + ".fromDate"} label={"From"} fullWidth InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextInputField type="date" name={name + ".toDate"} label={"To"} fullWidth InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                        </>
                    ) : (<></>)
                }

                <Grid item xs={12}>
                    <TextInputField name={name + ".description"} label={"Description"} fullWidth multiline rows={4} />
                </Grid>

            </Grid>
        </Box >
    );
}