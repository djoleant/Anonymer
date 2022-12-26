import { Chip } from "@mui/material";
import { Box } from "@mui/system";

export default function SkillChips({ skills, variant = "filled" }) {
    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {
                skills.map((skill, index) => (
                    <Chip key={index} label={skill.name} variant={variant} />
                ))
            }
        </Box>
    )
}