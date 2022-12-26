import Chip from '@mui/material/Chip';
import { Grid, Typography, Paper, Box, Button, getSkeletonUtilityClass } from '@mui/material';
import * as React from 'react';
import TextField from '@mui/material/TextField';



export default function SkillsCategoriesEditor() {

    const getSkills = async () => {

        const response = await fetch("http://localhost:7240/CV/GetSkills", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            setSkills(fetchData.skills);
        }

    }

    const getCategories = async () => {

        const response = await fetch("http://localhost:7240/Internship/GetCategories", {
            credentials: "include"
        });
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData.categories)
            setCategories(fetchData.categories);
        }

    }

    React.useEffect(() => {
        getSkills();
        getCategories();
    }, [])

    const addSkill = async () => {
        fetch("http://localhost:7240/CV/AddSkill?name=" + encodeURIComponent(searchSkill), {
            method: "POST",
            credentials: "include"
        }).then(r => {
            r.json().then(resp => {
                if (resp.succeeded) {
                    getSkills();
                    setSearchSkill("");
                }
                else
                    alert("Action failed")
            })
        })
    }
    const addCategory = async () => {
        fetch("http://localhost:7240/Internship/AddCategory?name=" + encodeURIComponent(searchCategory), {
            method: "POST",
            credentials: "include"
        }).then(r => {
            r.json().then(resp => {
                if (resp.succeeded) {
                    getCategories();
                    setSearchCategory("");
                }
                else
                    alert("Action failed")
            })
        })
    }

    const [skills, setSkills] = React.useState([{ id: 1, label: "React" }, { id: 2, label: "C#" }])
    const [categories, setCategories] = React.useState([{ id: 1, name: "Kat1" }, { id: 2, name: "Kat2" }])
    const [searchSkill, setSearchSkill] = React.useState("");
    const [searchCategory, setSearchCategory] = React.useState("");
    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                    {"Skills"}
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
                    <TextField variant={"standard"} fullWidth placeholder='Search or Add'
                        onChange={(event) => { setSearchSkill(event.target.value) }}
                        value={searchSkill}
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
                        {
                            (skills.some((data) => data.label.toLowerCase().includes(searchSkill.toLowerCase()))) ? <></> :
                                <Button variant="contained" sx={{ display: "flex", alignItems: "baseline" }} onClick={() => { addSkill() }}>
                                    <Typography variant="button">{"Add skill"}</Typography>
                                    <Typography sx={{ fontWeight: "bold", ml: 1 }}>{searchSkill}</Typography>
                                </Button>
                        }
                        {skills
                            .filter((data) => data.label.toLowerCase().includes(searchSkill.toLowerCase()))
                            .map((data) => {



                                return (
                                    <Chip
                                        key={data.id}
                                        label={data.label}

                                        variant="outlined"

                                    />
                                );
                            })
                        }
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                    {"Categories"}
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
                    <TextField variant={"standard"} fullWidth placeholder='Search or Add'
                        onChange={(event) => { setSearchCategory(event.target.value) }}
                        value={searchCategory}
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
                        {
                            (categories.some((data) => data.name.toLowerCase().includes(searchCategory.toLowerCase()))) ? <></> :
                                <Button variant="contained" sx={{ display: "flex", alignItems: "baseline" }} onClick={() => { addCategory() }}>
                                    <Typography variant="button">{"Add skill"}</Typography>
                                    <Typography sx={{ fontWeight: "bold", ml: 1 }}>{searchCategory}</Typography>
                                </Button>
                        }
                        {categories
                            .filter((data) => data.name.toLowerCase().includes(searchCategory.toLowerCase()))
                            .map((data) => {



                                return (
                                    <Chip
                                        key={data.id}
                                        label={data.name}

                                        variant="outlined"

                                    />
                                );
                            })
                        }
                    </Box>
                </Paper>
            </Grid>

        </Grid>
    )
}