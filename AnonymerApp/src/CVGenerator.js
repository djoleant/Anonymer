import React, { useEffect, useState, createRef } from 'react';
import * as signalR from "@microsoft/signalr";
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
} from "@mui/material"

const fonts = ["Arial", "Montserrat", "Helvatica", "Calibri"]

export default function CVGenerator() {

    const [connection, setConnection] = useState(
        new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.None)
            .withUrl("http://localhost:5222/chathub")
            .build()
    );

    useEffect(() => {
        connection.on("RecieveMessage", function (message) {
            console.log("primam", message);
        });

        connection
            .start()
            .then(() => {
                connection.invoke("Subscribe", "2")
            });
        return () => {
            connection.off("RecieveMessage");
        };
    }, []);

    const sendMessage = async (sender, recipient, text) => {
        connection
            .invoke("SendMessage", sender, recipient, text)
            .then((msg) => {
                console.log("saljem", msg);
            })
            .catch(function (err) {
                return console.error(err.toString());
            });
    };

    return (
        <>
            <Button onClick={() => {
                sendMessage("2", "2", "pls radi")
            }}>
                Klikni me
            </Button>
        </>
    )
}