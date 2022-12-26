import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from '../CVFormFields/TextInputField';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ChipTransferList from './ChipTransferList';

export default function AboutForm() {


  const { values } = useFormikContext();
  useEffect(() => {
    getSkills();
    getCategories();
    console.log("a");
  }, []);
  const [skillData, setSkillData] = useState([]);
  const getSkills = async () => {
    const response = await fetch(
      "http://localhost:7240/CV/GetSkills",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setSkillData(fetchData.skills
        //   .map((cards, index) =>
        //   ({
        //     id: cards.id,
        //     label: cards.name
        //   })
        //   )
      );
    }
  };


  const [categoryData, setCategoryData] = useState([]);
  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:7240/Internship/GetCategories",
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setCategoryData(fetchData.categories
        .map((cards, index) =>
        ({
          id: cards.id,
          label: cards.name
        })
        ));
    }
  };

  return (
    <React.Fragment>
      {/* <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                <AccountCircleRoundedIcon sx={{ mr: 2 }} />
                About internship
            </Typography> */}
      <Paper
        sx={{ p: 3, mb: 4 }}
        variant="outlined"
      >
        <Divider sx={{ mb: 3 }} >New Internship</Divider>
        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid item xs={12}>
            <TextInputField name={"title"} label={"Title"} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextInputField name={"description"} label={"Description"} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextInputField name={"duration"} label={"Duration"} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInputField name={"compensation"} label={"Compensation"} fullWidth />
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>

            <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>


              <Divider sx={{ mb: 3 }} >Internship Skills</Divider>
              <ChipTransferList chipData={skillData} leftTitle={"Choose skills:"} rightTitle={"Added skills:"} fieldName={"skills"} />
              <Divider sx={{ mt: 5, mb: 3 }} >Internship Categories</Divider>
              <ChipTransferList chipData={categoryData} leftTitle={"Choose category of work:"} rightTitle={"Added categories:"} fieldName={"categories"} />

            </Grid >
          </Grid >
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
