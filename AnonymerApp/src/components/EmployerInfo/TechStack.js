import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import { Chip } from '@mui/material';

export default function TechStack(props) {
  const [value, setValue] = React.useState(2.5);
  const [hover, setHover] = React.useState(-1);

  return (
    //fetch categories
    <Grid container style={{ marginTop: 3, display: "flex", flexDirection: "row", justifyContent: "center" }} spacing={3} sx={{ mb: 4 }}>
      {
        props.categories.map((el, index) => (
          <Chip key={index} style={{ marginLeft: 7, marginTop: 7 }} variant="outlined" label={el.name} />

        ))
      }
      {/* <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                .Net
              </Button>  
              <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                Android
              </Button>  
              <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                Data Engineering & Analytics
              </Button> 
              <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                DevOps
              </Button>
              <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                QA Automation
              </Button>    
              <Button style={{marginLeft:7, marginTop:7}} variant="contained" disabled>
                JavaScript
              </Button>                  */}
    </Grid>
  );
}