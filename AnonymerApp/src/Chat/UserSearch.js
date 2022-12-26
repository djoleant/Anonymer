import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function UserSearch({ onChange }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }



        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            sx={{ width: "70vw", maxWidth: "500px", mt: 1 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (

                <Box {...props} sx={{ display: "flex", gap: 3 }} key={option.id}>
                    <Avatar src={process.env.PUBLIC_URL + "/resources/" + option.picture}></Avatar>
                    <Box>
                        <Typography>{option.name}</Typography>
                        <Typography variant="caption">{option.userName}</Typography>
                    </Box>
                </Box>
            )}
            filterOptions={(options, { inputValue }) => (
                options//.filter(op => op.userName.toLowerCase().includes(inputValue.toLowerCase()) || op.name.toLowerCase().includes(inputValue.toLowerCase()))
            )}
            onChange={(e, v) => { onChange(v); }}
            options={options}
            loading={loading}
            onInputChange={(event, newInputValue) => {
                //console.log(newInputValue)
                if (newInputValue.length >= 3)
                    (async () => {
                        const response = await fetch("http://localhost:7240/Account/GetUsers?searchParam=" + newInputValue, {
                            credentials: "include",
                        });
                        if (response.ok) {
                            const fetchData = await response.json();
                            if (fetchData.users.length > 0) {
                                setOptions(fetchData.users);
                            }
                        }

                    })();
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Receiver"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

// // Top films as rated by IMDb users. http://www.imdb.com/chart/top
// const users = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     {
//         title: 'The Lord of the Rings: The Return of the King',
//         year: 2003,
//     },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     {
//         title: 'The Lord of the Rings: The Fellowship of the Ring',
//         year: 2001,
//     },
//     {
//         title: 'Star Wars: Episode V - The Empire Strikes Back',
//         year: 1980,
//     },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     {
//         title: 'The Lord of the Rings: The Two Towers',
//         year: 2002,
//     },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     {
//         title: 'Star Wars: Episode IV - A New Hope',
//         year: 1977,
//     },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
// ];
