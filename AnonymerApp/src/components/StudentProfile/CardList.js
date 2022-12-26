import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SmallInternshipCard from "./SmallInternshipCard";


export default function CardList({ type }) {
    const [internships, setInternships] = useState([]);
    const theme = useTheme();

    const getInternships = async () => {
        let response;
        if (type === "internships") {
            response = await fetch("http://localhost:7240/Internship/GetStudentInternships", {
                credentials: "include"
            });
        }
        else if (type === "wishlist") {
            response = await fetch("http://localhost:7240/Internship/GetWishlistInternships", {
                credentials: "include"
            });
        }
        else
            return;
        const data = await response.json();
        console.log(data)
        if (data.succeeded)
            setInternships(data.internships);
    }

    useEffect(() => {
        getInternships();
    }, [])

    return (
        <Grid container spacing={3}>
            {
                internships.map((internship, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <SmallInternshipCard
                            {...internship}
                            showBookmark={(type === "wishlist")}
                            banner={
                                type === "internships" ?
                                    <Typography
                                        sx={{
                                            m: -3,
                                            backgroundColor: (internship.status === "Applied" || internship.status === "Finished") ?
                                                theme.palette.primary.main : internship.status === "Accepted" ?
                                                    theme.palette.success.main : theme.palette.error.main
                                            ,
                                            mb: 1,
                                            color: "white"
                                        }}
                                    >
                                        {internship.status}
                                    </Typography>
                                    : undefined
                            }
                            wishlisted={type === "wishlist"}
                            link={"/Internship/" + internship.internshipID}
                        />
                    </Grid>
                ))
            }
        </Grid >
    )
}