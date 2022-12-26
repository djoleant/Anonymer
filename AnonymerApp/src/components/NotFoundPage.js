import { Typography, Avatar, Grid, Button } from "@mui/material";

export default function NotFoundPage() {
    return (
        <>
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems:"center", height: "60%", marginBottom: 20, flexWrap:"wrap" }}>
            <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", height: "60%", marginBottom: 20 }}>
            <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/images/error404.jpg"}
                  sx={{ width: 360, height: 150, marginTop: 14, justifySelf: "center" }}
                />
            </Grid>
            <Grid style={{alignItems:"flex-start"}}>
            <Typography style={{color:"#8298cb", fontWeight:"bold", fontSize:60, justifySelf:"flex-start", alignSelf:"flex-start"}}>Ooops...</Typography>
            <Typography style={{color:"#8298cb", fontWeight:"bold", fontSize:25}}>Seems like we couldn't find this page!</Typography>
            <Button variant="contained" href="http://localhost:3000/" style={{marginTop:30, backgroundColor:"#f50057"}}>GO BACK TO HOME PAGE</Button>
            <Typography style={{color:"#8298cb",fontWeight:"bold", fontSize:25}}>or</Typography>
            <Button  href="http://localhost:3000/Register/student" variant="outlined" style={{marginTop:10, width:214}}>REGISTER</Button>
            </Grid>
            
        </Grid>
        </>

    )
}