import React from "react"
import { useParams } from "react-router-dom"
import useWebSocket from "react-use-websocket"
import useCrud from "../../hooks/useCrud"
import { Server } from "../../@types/server"
import { Box, Typography, List, ListItem,
    ListItemText, ListItemAvatar, Avatar,
    useTheme, TextField } from "@mui/material"
import MessageInterfaceChannels from "./MessageInterfaceChannels"
import Scroll from './Scroll'

interface ServerChannelProps{
    data: Server[];
}

interface Message{
    sender: string;
    content: string;
    timestamp: string;
}

interface SendMessageData{
    type:string;
    message: string;
    [key:string]: any;
}

const MessageInterface = (props:ServerChannelProps) => {
    const theme = useTheme();
    const {data} = props;
    const [message, setMessage] = React.useState("")
    const [newMessage, setNewMessage] = React.useState<Message[]>([]);
    const {serverId, channelId} = useParams();

    const server_name = data?.[0]?.name ?? "Server";

    const { fetchData } = useCrud<Server>([], `/messages/?channel_id=${channelId}`)

    const websocketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null

    const { sendJsonMessage } = useWebSocket(websocketUrl, {
        onOpen: async () =>{
            try{
                const data = await fetchData();
                setNewMessage([]);
                setNewMessage(Array.isArray(data) ? data : []);
                console.log("Connected")
            }catch (error){
                console.log(error)
            }

        },
        onClose: () =>{
            console.log("Closed")
        },
        onError: () =>{
            console.log("Error")
        },
        onMessage: (msg) =>{
            const data = JSON.parse(msg.data)
            console.log(data)
            setNewMessage((prevMessage) => [...prevMessage, data.new_message])
            setMessage("");
        }
    })

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === "Enter"){
            e.preventDefault();
            sendJsonMessage({
            type:"message",
            message,
        } as SendMessageData)
        }

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        sendJsonMessage({
            type:"message",
            message,
        } as SendMessageData)
    }

  return (
    <>
    <MessageInterfaceChannels data={data}/>
    {channelId === undefined ? (<Box
    sx={{
        overflow:"hidden",
        p:{xs:0},
        height:`calc(80vh)`,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Box sx={{textAlign:"center"}}>
            <Typography variant="h4"
            fontWeight={700}
            letterSpacing = {"-0.5px"}
            sx={{px:5, maxWidth:"600px"}}>
                Welcome to {server_name}
            </Typography>
            <Typography>{data?.[0]?.description ?? "This is our home"}</Typography>

        </Box>
    </Box>):
    (
        <>

        <Box sx={{
            overflow:"hidden",
            p:0,
            height: `calc(100vh - 100px)`
        }}>
            <Scroll>
                <List sx={{width:"100%", bgColor:"background.paper"}}>
                    {newMessage.map((msg:Message, index:number)=>{
                        return (

                            <ListItem key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="user Image"/>
                                </ListItemAvatar>
                                <ListItemText
                                primaryTypographyProps={{
                                    fontSize:"12px"
                                ,variant:"body2"}}
                                primary={
                                    <Typography component="span"
                                    variant="body1"
                                    color="text.primary"
                                    sx={{
                                        display:"inline",
                                        fontWeight:600
                                    }}>
                                        {msg.sender}
                                    </Typography>
                                }

                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body1" style={{
                                        overflow:"visible",
                                        whiteSpace:"normal",
                                        textOverflow:"clip",
                                        }}
                                        sx={{display:"inline",
                                        lineHeight:1.2,
                                        fontWeight:400,
                                        letterSpacing:"-0.2px"}}
                                        component="span"
                                        color="text.primary">
                                            {msg.content}
                                        </Typography>
                                    </React.Fragment>
                                }>
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </Scroll>
        </Box>
        <Box sx= {{
            position:"sticky",
            bottom:0,
            width: "100%"
        }}>
            <form action="" onSubmit={handleSubmit}
             style={{
                bottom:0, right:0, padding:"1rem",
                 backgroundColor:theme.palette.background.default,
                 zIndex:1
            }}>
                <Box sx={{display:"flex"}}>
                    <TextField fullWidth
                    multiline
                    value={message}
                    minRows={1}
                    maxRows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{flexGrow:1}}/>
                </Box>
            </form>
        </Box>
        </>
    )}
    </>
  )
}

export default MessageInterface
