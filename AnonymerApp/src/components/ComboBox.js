import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

export default function ComboBox() {
  const [categoryData, setCategoryData] = useState(null);

  const [backgroundColor, setColor] = useState("blue");


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
          label: cards.name
        })
        ));
    }
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategories();
    console.log("a");
  }, []);

  console.log(categoryData);

  const navigate = useNavigate();



  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={
        categoryData
      }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
