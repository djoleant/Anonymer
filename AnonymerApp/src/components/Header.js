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
import { Divider } from "@mui/material";
import { logout } from "../actions/Auth";
import { useTheme } from "@emotion/react";

const pages = ["Home", "Internships", "Employers", "About"];
const settings = ["Account", "CV Creator", "CV Export", "Logout", "Admin Dashboard", "Post internship"];

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
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));

  const theme = useTheme();

  const reloadHeader = () => {
    // setRole(localStorage.getItem("role"));
    // setUsername(localStorage.getItem("username"));
    // setPicture(localStorage.getItem("picture"));
    handleCloseUserMenu();
  }

  const handleMenuClick = async (option) => {
    console.log(option);
    if (option === "Logout") {
      await logout();
      localStorage.setItem("role", "Guest");
      reloadHeader();
      navigate("/SignIn")
    } else if (option === "Account") {
      navigate("/MyAccount");
    }
    else if (option === "CV Creator") {
      navigate("/CVCreator")
    }
    else if (option === "CV Export") {
      navigate("/CVGenerator")
    }
    else if (option === "Admin Dashboard") {
      navigate("/AdminDashboard")
    }
    else if (option === "Post internship") {
      navigate("/InternshipCreator");
    }
  }
  return (
    <React.Fragment>
      <AppBar sx={{ display: location.pathname.includes("/Chat") ? "none" : "" }} position="sticky">
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography style={{ justifySelf: "center" }}>
            Runtime Terror stands in solidarity with the Ukrainan people. {"  "}{" "}
            <Link
              style={{ color: theme.palette.secondary.main }}
              href="https://war.ukraine.ua/support-ukraine/"
            >
              {" "}
              Find out how you can help.
            </Link>
          </Typography>
        </Container>
      </AppBar>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              InternClix
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
                  <MenuItem key={page} onClick={() => { navigate("/" + page) }}>
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
              InternClix
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { navigate("/" + page) }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>


            {
              (role !== "Guest") ?
                <>
                  <MenuItem>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => { navigate("/Chat") }}
                    >
                      <MailIcon />
                    </IconButton>
                  </MenuItem>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + "/resources/" + picture} />
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
                      <MenuItem >
                        <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
                      </MenuItem>
                      <Divider sx={{ ml: 1, mr: 1 }} />
                      {settings
                        .filter((setting) => {
                          if (role === "Employer") {
                            return setting !== "CV Creator" && setting != "CV Export" && setting !== "Admin Dashboard";
                          }
                          if (role === "Admin") {
                            return setting !== "CV Creator" && setting != "CV Export" && setting !== "Post internship";
                          }
                          if (role === "Student") {
                            return setting !== "Admin Dashboard" && setting !== "Post internship";
                          }
                          return true;
                        })
                        .map((setting) => (
                          <MenuItem key={setting} onClick={() => { handleMenuClick(setting) }}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                        ))}

                      <MenuItem onClick={ThemeHandler}>
                        <Switch checked={localStorage.getItem("mode") === "dark"} />

                      </MenuItem>
                    </Menu>
                  </Box>
                </> :
                <>
                  <MenuItem onClick={() => { navigate("/SignIn") }}>
                    <Typography textAlign="center">Sign In</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { navigate("/Register/student") }}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem >
                  <MenuItem onClick={ThemeHandler}>
                    <Switch checked={localStorage.getItem("mode") === "dark"} />
                  </MenuItem>
                </>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Component reloadHeader={reloadHeader} type={componentType} />
    </React.Fragment>
  );
};
export default Header;
