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
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import MailIcon from "@mui/icons-material/Mail";
import { Button, Fab } from "@mui/material";
import ChatMessage from "./ChatMessage";
import SingleChat from "./SingleChat";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams, useNavigate, Link } from "react-router-dom";
import NewMessageDialog from "./NewMessageDialog";


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

export default function Chat() {
  const [chats, setChats] = useState([]);

  const forceUpdate = useForceUpdate();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();
  // const user = useSelector((state) => state.auth.userData);

  const { id } = useParams();

  const [currentChat, setCurrentChat] = useState(id);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    const response = await fetch("http://localhost:7240/Chat/latestChats/10",
      {
        credentials: "include"
      });
    const data = await response.json();
    setChats(data.lastMessages);
    console.log(data.lastMessages)
  };

  // const onPaperClickHandler = (id) => {
  //     history.push(`/chat/${id}`);
  // };

  const theme = useTheme();
  const [open, setOpen] = React.useState(id == undefined);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    if (id != undefined)
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
          width: id != undefined ? drawerWidth : "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: id != undefined ? drawerWidth : "100%",
            boxSizing: "border-box",
          },
          zIndex: open ? 1 : 0,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ mt: 8.5 }}>
          <NewMessageDialog loadChats={getChats} />
          <IconButton
            onClick={handleDrawerClose}
            sx={{ display: (id != undefined) ? "" : "none" }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Grid item xs={12} style={{ padding: "10px" }}>
          <TextField
            onChange={(event) => { setSearch(event.target.value) }}
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Divider />

        <List>
          {chats.
            filter(c => c.value.message.userName.toLowerCase().includes(search.toLowerCase()))
            .map((chat, index) => (
              <ListItem
                button
                key={index}
                onClick={() => { setCurrentChat(chat.key); navigate("/Chat/" + chat.key); console.log(chat.key) }}
                selected={chat.key == id}
              >
                <ListItemIcon>
                  <Avatar
                    alt="Icon"
                    src={process.env.PUBLIC_URL + "/resources/" + chat.value.message.picture}
                  />
                </ListItemIcon>
                <Grid>
                  <Typography sx={{ fontWeight: "bold" }} align="left" >{chat.value.message.userName}</Typography>
                  <Typography align="left" noWrap={true} variant="body2">
                    {
                      (chat.value.message.type.includes("INTERNSHIP")) ?
                        ("Internship") :
                        (chat.value.message.content)
                    }
                  </Typography>
                </Grid>

              </ListItem>
            ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {(id != null && id != undefined) ? <SingleChat id={currentChat} updateChats={getChats} /> : <></>}
      </Main>
    </Box>
  );
}
