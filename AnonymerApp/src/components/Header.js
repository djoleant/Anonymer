import * as React from "react";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Switch from "./ThemeSwitch";
import { changeTheme } from "../App";
import { Divider, TextField } from "@mui/material";
import { logout } from "../actions/Auth";
import { useTheme } from "@emotion/react";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

const pages = ["Feed","Chat"];

export const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { Component, ThemeHandler, componentType } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));

  const theme = useTheme();

  const reloadHeader = () => {
    // setRole(localStorage.getItem("role"));
    // setUsername(localStorage.getItem("username"));
    // setPicture(localStorage.getItem("picture"));
    handleCloseUserMenu();
  }

  const getUsername = async () => {
    if (localStorage.getItem("userID") == undefined)
      return;
    const resp = await fetch("http://localhost:5222/api/Home/GetUsername/" + localStorage.getItem("userID"));
    const data = await resp.json();
    setUsername(data.username);
  }

  React.useEffect(() => {
    getUsername();
  }, []);

  const [username, setUsername] = useState("");

  
  return (
    <React.Fragment>
      
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Anonymer
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => { navigate("/Feed") }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Anonymer
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { navigate("/Feed") }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <SensorOccupiedIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {username != "" ? <MenuItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <Typography >{"Registered as:"}</Typography>
                    <Typography sx={{ fontWeight: "bold" }}>{"@" + username}</Typography>
                  </MenuItem> : <></>}
                  <Divider sx={{ ml: 1, mr: 1 }} />

                  <MenuItem onClick={() => { }}>
                    <TextField size="small" label="New username" id="new_username" />
                  </MenuItem>
                  <MenuItem onClick={() => { }}>
                    <Button variant="contained" sx={{ width: "100%" }} onClick={() => {
                      fetch("http://localhost:5222/api/Home/CreateUser/" + document.getElementById("new_username").value, {
                        method: "POST"
                      }).then(r => {
                        if (r.ok) {
                          r.json().then(data => {
                            localStorage.setItem("userID", data.id);
                            getUsername();
                          })
                        }
                      })
                    }}>Register</Button>
                  </MenuItem>
                  <MenuItem onClick={ThemeHandler}>
                    <Switch checked={localStorage.getItem("mode") === "dark"} />
                    <Typography sx={{ ml: 2 }}>{"Change theme"}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>

          </Toolbar>
        </Container>
      </AppBar>
      <Component reloadHeader={reloadHeader} type={componentType} />
    </React.Fragment>
  );
};
export default Header;
