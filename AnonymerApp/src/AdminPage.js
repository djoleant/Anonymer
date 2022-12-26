import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { Avatar, Grid, TextField, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/MenuRounded";
import { useParams, useNavigate, Link } from "react-router-dom";
import SkillsCategoriesEditor from "./components/AdminPages/SkillsCategoriesEditor";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import InternshipsTable from "./components/AdminPages/InternshipApplications";
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AboutUsPage from "./components/AboutUs/Statistics";

const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function AdminPage() {

    const forceUpdate = useForceUpdate();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // const history = useHistory();
    // const user = useSelector((state) => state.auth.userData);

    const { id } = useParams();

    const [page, setPage] = useState(0);

    useEffect(() => {
        //getChats();
    }, []);



    // const onPaperClickHandler = (id) => {
    //     history.push(`/chat/${id}`);
    // };

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {

        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", overflow: "hidden" }}>
            <CssBaseline />
            <Fab
                onClick={handleDrawerOpen}
                sx={{ position: "fixed", m: 2, display: open ? "none" : "" }}
            >
                <ChatIcon />
            </Fab>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                    zIndex: open ? 1 : 0,
                }}
                variant="persistent"
                anchor="left"
                open={open}
            // PaperProps={{ sx: { backgroundColor: theme.palette.info.main } }}
            >
                <DrawerHeader sx={{ mt: 12, }}>
                    <IconButton
                        onClick={handleDrawerClose}

                    >
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>


                <List
                >
                    <Divider />
                    <Box sx={{ p: 1 }}>
                        <ListItemButton
                            onClick={() => { setPage(0) }}
                            selected={page === 0}
                            sx={{ borderRadius: 15 }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                                <CategoryRoundedIcon />
                                Skills and Categories
                            </Typography>
                        </ListItemButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <ListItemButton
                            onClick={() => { setPage(1) }}
                            selected={page === 1}
                            sx={{ borderRadius: 15 }}
                        >
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                                <AssignmentIndRoundedIcon />
                                Internship Applications
                            </Typography>
                        </ListItemButton>
                    </Box>
                    {/* <Box sx={{ p: 1 }}>
                        <ListItemButton
                            onClick={() => { setPage(2) }}
                            selected={page === 2}
                            sx={{ borderRadius: 15 }}

                        >
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                                <BarChartRoundedIcon />
                                Statistics
                            </Typography>
                        </ListItemButton>
                    </Box> */}
                </List>
            </Drawer>
            <Main open={open} sx={{ pt: 7 }}>

                {
                    page === 0 ?
                        <SkillsCategoriesEditor /> :
                        page === 1 ?
                            <InternshipsTable /> :
                            <></>

                }
            </Main>
        </Box>
    );
}
