import React, { useState, useEffect, useLayoutEffect, createRef } from "react";
import {
  Button,
  Chip,
  Paper,
  ListItem,
  Fab,
  Grid,
  TextField,
  Divider,
  List,
} from "@mui/material";
import ChatMessage from "./ChatMessage";
import SendIcon from "@mui/icons-material/Send";
import * as signalR from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import moment from 'moment';

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect(),
    top = rect.top,
    height = rect.height,
    el = el.parentNode;
  // Check if bottom of the element is off the page
  if (rect.bottom < 0) return false;
  // Check its within the document viewport
  if (top > document.documentElement.clientHeight) return false;
  do {
    rect = el.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;
    // Check if the element is out of view due to a container scrolling
    if (top + height <= rect.top) return false;
    el = el.parentNode;
  } while (el != document.body);
  return true;
}

export default function SingleChat({ id, updateChats }) {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postPage, setPostPage] = useState(0);
  const [morePosts, setMorePosts] = useState(true);
  const [scrollDown, setScrollDown] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const [connection, setConnection] = useState(
    new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl("http://localhost:7240/chathub")
      .build()
  );


  const ref = createRef();
  const ref2 = createRef();
  const textref = createRef();

  const onMessageEnterHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage(e.target);
    }
  };

  const receiveMessage = (message) => {
    if (ref.current != null) {
      if (isScrolledIntoView(ref.current)) setScrollDown(true);
    }
    console.log(message)
    console.log(id)
    if (message.senderId == id)
      setMessages((posts) => [...posts, message]);
    updateChats();
  };

  useEffect(() => {
    connection.on("RecieveMessage"/* + id*/, function (message) {
      receiveMessage(message);
    });

    connection
      .start()
      .then(function () {
        getMessages(0);
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    return () => {
      connection.off("RecieveMessage" /*+ id*/);
    };
  }, [id]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
      return;
    }
    //setLoading(false);
    setPostPage(0);
    setMorePosts(true);
    setScrollUp(false);

    if (ref.current != null) {
      if (isScrolledIntoView(ref.current)) setScrollDown(true);
    }

    (async () => { setMessages([]); await getMessages(0) })()

  }, [id])

  // useEffect(() => {
  //   setMessages([]);
  //   setLoading(true);
  //   setPostPage(0);
  //   setMorePosts(true);
  //   setScrollDown(true);
  //   setScrollUp(false);
  // }, []);

  const getMessages = async (lastMessage) => {
    if (lastMessage === 0) setScrollDown(true);
    else setScrollUp(true);
    const response = await fetch(
      `http://localhost:7240/Chat/preview/user/${id}/${lastMessage === 0 ? "" : lastMessage
      }`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.messages.length > 0) {
      setPostPage(data.messages[data.messages.length - 1].id);
      if (!messages.map(m => m.id).includes(data.messages[0]))
        setMessages((posts) =>
          posts.concat(data.messages).sort((a, b) => a.id - b.id)
        );
    }
    //console.log(data)
    //console.log(messages)
    if (loading) {
      setLoading(false);
    }
    if (data.messages.length < 30) {
      setMorePosts(false);
      return;
    }
  };

  const loadMessages = (event) => {
    if (event.target.scrollTop === 0) {
      if (morePosts) {
        getMessages(postPage);
      }
    }
  };

  const sendMessage = async (e) => {
    setScrollDown(true);
    if (e.value == "") return;
    connection
      .invoke("SendMessage", id, e.value, "")
      .then((msg) => {
        setMessages((posts) => [...posts, msg]);
        setScrollDown(true);
        updateChats();
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    e.value = "";
    e.focus();
  };

  useLayoutEffect(() => {
    if (ref.current != null && scrollDown) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      //if (!loading) setScrollDown(false);
    }
    if (ref2.current != null && scrollUp) {
      ref2.current.scrollIntoView({ behavior: "smooth" });
      setScrollUp(false);
    }
  }, [messages, ref]);

  const scroll = (
    <List
      onScroll={loadMessages}
      style={{
        height: "90%",
        overflowY: "scroll",
      }}
    >

      <div ref={ref2} ></div>
      {messages !== null ? (
        messages
          .filter((value, index, self) => self.find(m => m.id === value.id) == value)
          .map((message, index) => (
            <ChatMessage
              sender={message.senderUsername}
              content={message.content}
              type={message.type}
              key={index}
              time={moment(message.timeSent).format("hh:mm")}
              align={message.senderId == id ? "left" : "right"}
            />
          ))
      ) : (
        <div></div>
      )}
      <div
        ref={ref}
        style={{
          width: "8px",
          height: "16px",
        }}
      ></div>
      <br />
    </List>
  );
  // if (loading) return <div></div>;
  // else
  return (

    <Grid
      item
      xs={9}
      sx={{
        height: "81vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        mt: "-64px",
      }}
    >
      {scroll}
      <Divider />
      <Grid container sx={{ pt: 3, pr: 5 }}>
        <Grid item xs={11}>
          <TextField
            ref={textref}
            id="outlined-basic-email"
            label="Type Message"
            multiline
            key="textfield-new-message"
            maxRows={5}
            fullWidth
            onKeyDown={(e) => onMessageEnterHandler(e)}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab
            color="primary"
            aria-label="add"
            sx={{ ml: 2, mr: 1 }}
            onClick={(e) =>
              sendMessage(textref.current.childNodes[1].firstChild)
            }
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}
