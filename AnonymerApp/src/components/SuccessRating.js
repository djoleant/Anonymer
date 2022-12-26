import { Typography, Avatar, Grid, Button } from "@mui/material";

export default function SuccessRating() {
    return (
        <>
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems:"center", height: "60%", marginBottom: 20, flexWrap:"wrap" }}>
            <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", height: "60%", marginBottom: 20 }}>
            <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/success.jpg"}
                  sx={{ width: 560, height: 250, marginTop: 14, justifySelf: "center" }}
                />
            </Grid>
            <Grid style={{alignItems:"flex-start"}}>
            <Typography style={{color:"#618fba", fontWeight:"bold", fontSize:60, justifySelf:"flex-start", alignSelf:"flex-start"}}>Sucess!</Typography>
            <Typography style={{color:"#618fba", fontWeight:"bold", fontSize:25}}>Your rating has been submitted!</Typography>
            <Button variant="contained" href="http://localhost:3000/" style={{marginTop:30, backgroundColor:"#f50057"}}>GO BACK TO HOME PAGE</Button>
            </Grid>
            
        </Grid>
        </>

    )
}




