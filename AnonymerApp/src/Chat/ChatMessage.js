import { Grid, ListItem, ListItemText, Paper, Box, useTheme, Typography } from "@mui/material"
import { maxWidth } from "@mui/system";
import SmallInternshipCard from "../components/StudentProfile/SmallInternshipCard";

export default function ChatMessage({ content, time, align, type, sender }) {

    const theme = useTheme();

    //console.log(type);

    let title, companyName, location, compensation, duration, description, link, messageContent, skills;
    if (type.includes("INTERNSHIP")) {
        [title, companyName, location, compensation, duration, description, link, messageContent, ...skills] = content.split("^");
        skills = skills.map(s => ({ name: s }));

    }

    return (
        (type.includes("INTERNSHIP")) ?
            (
                <Box sx={{
                    width: 1, display: "flex", flexDirection: ((align == "right") ? "row-reverse" : "row"), mt: 2
                }}>
                    <SmallInternshipCard
                        title={title}
                        companyName={companyName}
                        location={location}
                        compensation={compensation}
                        duration={duration}
                        description={description}
                        skills={skills}
                        link={link}
                        time={<ListItemText align={align} secondary={time} sx={{ mb: -2, mt: 2, color: (align == "left" ? "white" : "") }}></ListItemText>}
                        banner={
                            <Box sx={{
                                backgroundColor: type.includes("DENY") ? theme.palette.error.main : type.includes("ACCEPT") ? theme.palette.success.main : theme.palette.info.main,
                                color: "white", mr: -3, ml: -3, mt: -3, mb: 2
                            }}>
                                <Typography
                                    sx={{ color: "white", }}
                                    variant="h6"
                                >
                                    {sender + (type.includes("DENY") ? " denied your internship application" : type.includes("ACCEPT") ? " accepted your internship application" : " shared an internship wih you")}
                                </Typography>
                                <ListItemText align={align} primary={messageContent} sx={{ color: "white", pl: 3, pr: 3, pt: 1, pb: 1 }}></ListItemText>
                            </Box>
                        }
                        maxWidth="550px"
                    />
                </Box>
            ) :
            (
                <Box sx={{
                    width: 1, display: "flex", flexDirection: ((align == "right") ? "row-reverse" : "row")
                }}>
                    <Paper align="right" variant="outlined" sx={{ width: "fit-content", m: 1, backgroundColor: (align == "left") ? theme.palette.primary.main : "" }}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={align} primary={content} sx={{ color: (align == "left" ? "white" : "") }}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={align} secondary={time} sx={{ color: (align == "left" ? "white" : "") }}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Paper>
                </Box >
            )
    )
}