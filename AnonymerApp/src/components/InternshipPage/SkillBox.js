import { Paper, Chip, useTheme, Typography } from "@mui/material";

export default function SkillBox({ skills, color, title, icon }) {
    const theme = useTheme();
    return (
        <>
            <Typography align="left" variant="subtitle2">{title}</Typography>
            <Paper
                variant="outlined"
                sx={{
                    display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", p: 2,
                    borderColor: color === "success" ? theme.palette.success.main : (color === "info") ? theme.palette.info.main : theme.palette.error.main
                }}
            >
                {
                    skills.map((skill, index) => (
                        <Chip key={index} label={skill} color={color} icon={icon} />
                    ))
                }
            </Paper>
        </>
    )
}