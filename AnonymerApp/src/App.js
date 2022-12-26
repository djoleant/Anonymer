import logo from "./logo.svg";
import * as React from "react";
import "./App.css";
import SignIn from "./SignIn";
import Register from "./Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import { Component } from "react";
import CVCreator from "./CVCreator";
import CVGenerator from "./CVGenerator";
import EmployerInfoPage from "./EmployerInfoPage";
import EmployerRatingPage from "./EmployerRatingPage";
import StudentProfilePage from "./StudentProfilePage";
import Internships from "./Internships";
import Chat from "./Chat/Chat";
import EmployerInternsipPage from "./EmployerInternshipPage";
import Employers from "./Employers";
import InternshipCreator from "./InternshipCreator";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import Redirect from "./components/Redirect";
import Profile from "./components/Profile";
import { loadUserData, clearData } from "./actions/Auth";
import NotFoundPage from "./components/NotFoundPage";
import SuccessRating from "./components/SuccessRating";
import AdminPage from "./AdminPage";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        // palette values for light mode
        primary: {
          main: "#618fba",//618fba - lepa je
        },
        secondary: {
          main: "#f50057",
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: "#618fba",
        },
        secondary: {
          main: "#f50057",
        },
      }),
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#228a8a",
    },
    secondary: {
      main: "#f50057",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const themeOptions2 = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#228a8a",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
      disabled: "rgba(255,255,255,0.7)",
      hint: "rgba(255,255,255,0.5)",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const themes = [themeOptions, themeOptions2];
export let changeTheme;

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function App() {
  const [mode, setMode] = React.useState(localStorage.getItem("mode") ?? "light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("mode", localStorage.getItem("mode") === "light" ? "dark" : "light");
      },
    }),
    []
  );

  React.useEffect(() => {
    // clearData();
    // loadUserData();
  }, [])

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/SignIn"
            element={
              <Header
                Component={SignIn}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/Register/:role"
            element={
              <Header
                Component={Register}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/CVCreator"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student"]}
                component={
                  <Header
                    Component={CVCreator}
                    ThemeHandler={colorMode.toggleColorMode}
                  />
                }
              />
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <Redirect
                to="/"
                roles={["Admin"]}
                component={
                  <Header
                    Component={AdminPage}
                    ThemeHandler={colorMode.toggleColorMode}
                  />
                }
              />
            }
          />
          <Route
            path="/CVGenerator"
            element={
              <Header
                Component={CVGenerator}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/Internships"
            element={
              <Header
                Component={Internships}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/InternshipCreator"
            element={
              <Header
                Component={InternshipCreator}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/MyAccount"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student", "Employer"]}
                component={
                  <Header
                    Component={Profile}
                    ThemeHandler={colorMode.toggleColorMode}
                  />
                }
              />
            }
          />
          <Route
            path="/Student/:id"
            element={
              <Header
                Component={StudentProfilePage}
                ThemeHandler={colorMode.toggleColorMode}
                componentType="public"
              />
            }
          />
          <Route
            path="/Employer/:id"
            element={
              <Header
                Component={EmployerInfoPage}
                ThemeHandler={colorMode.toggleColorMode}
                componentType="public"
              />
            }
          />
          {/* <Route
            path="/EmployerInfoPage"
            element={
              <Header
                Component={EmployerInfoPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          /> */}
          <Route
            path="/Employers"
            element={
              <Header
                Component={Employers}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/EmployerRatingPage/:id"
            element={
              <Header
                Component={EmployerRatingPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          {/* <Route
            path="/StudentProfile"
            element={
              <Header
                Component={StudentProfilePage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          /> */}

          <Route
            path="/Chat/:id"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student", "Employer"]}
                component={
                  <Header
                    Component={Chat}
                    ThemeHandler={colorMode.toggleColorMode}
                  />
                }
              />

            }
          />
          <Route
            path="/Chat"
            element={
              <Redirect
                to="/SignIn"
                roles={["Student", "Employer"]}
                component={
                  <Header
                    Component={Chat}
                    ThemeHandler={colorMode.toggleColorMode}
                  />
                }
              />
            }
          />
          <Route
            path="/Internship/:id"
            element={


              <Header
                Component={EmployerInternsipPage}
                ThemeHandler={colorMode.toggleColorMode}
              />

            }
          />
          <Route
            path="/Home"
            element={
              <Header
                Component={HomePage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/"
            element={
              <Header
                Component={HomePage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/About"
            element={
              <Header
                Component={AboutUsPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="*"
            element={
              <Header
                Component={NotFoundPage}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
          <Route
            path="/SuccessRating"
            element={
              <Header
                Component={SuccessRating}
                ThemeHandler={colorMode.toggleColorMode}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
