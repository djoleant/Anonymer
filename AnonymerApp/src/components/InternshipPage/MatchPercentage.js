import { useTheme } from "@mui/material"
import { Box, Typography, LinearProgress } from "@mui/material";

const calculateColor = (value = 0) => {
    if (value >= 75)
        return "success";
    if (value >= 35)
        return "warning";
    else
        return "error";
}

export default function MatchPercentage(props) {

    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} color={calculateColor(props.value)} sx={{ height: 10, borderRadius: 10 }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {
                        `${Math.round(props.value,)}%`
                    }
                </Typography>
            </Box>
        </Box>
    );
}