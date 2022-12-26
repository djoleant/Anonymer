import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, useScrollTrigger } from '@mui/material';
import { changeTheme } from '../../App';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function InternshipsTable() {
    const [rows, setRows] = React.useState([
        // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        // createData('Eclair', 262, 16.0, 24, 6.0),
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]);
    const getApplications = async () => {
        const response = await fetch("http://localhost:7240/Account/GetApplications/" + username, {
            credentials: "include"
        });
        const data = await response.json();
        console.log(data)
        if (data.applications != null) {
            setRows(data.applications.applications)
            setCurrentName(data.applications.name);

            setUserId(data.applications.id);
        }
    }
    const handleChange = async (id, newStatus) => {
        const response = await fetch(`http://localhost:7240/Account/GetApplications/${userId}/${id}/${newStatus}`, {
            method: "PUT",
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.succeeded) {
                getApplications();
            }
        }
    }
    const [username, setUsername] = React.useState("")
    const [currentName, setCurrentName] = React.useState("");
    const [userId, setUserId] = React.useState("");
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "baseline", mr: 7 }}>
                <TextField label="Username" value={username} onChange={(e) => { setUsername(e.target.value) }}></TextField>
                <Button variant="contained" onClick={getApplications}>Search</Button>
            </Box>
            <Typography variant="h4" sx={{ mt: 1, display: (currentName == "") ? "none" : "" }}>{currentName + "'s applications"}</Typography>
            <Box sx={{ overflowX: "scroll", maxWidth: "95vw", p: 2, mr: 2 }}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Internship</StyledTableCell>
                                <StyledTableCell >Employer</StyledTableCell>
                                <StyledTableCell >Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.companyName}</StyledTableCell>
                                    <StyledTableCell>
                                        <FormControl variant="standard" sx={{ p: 0, m: 0, minWidth: 120 }} size="small">
                                            {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                //value={age}
                                                onChange={(e) => { handleChange(row.id, e.target.value) }}
                                                sx={{ p: 0, m: 0 }}
                                                value={row.status}
                                            >

                                                <MenuItem value={"Applied"}>Applied</MenuItem>
                                                <MenuItem value={"Finished"}>Finished</MenuItem>
                                                <MenuItem value={"Denied"}>Denied</MenuItem>
                                                <MenuItem value={"Accepted"}>Accepted</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
