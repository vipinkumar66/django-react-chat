import React from "react"
import { useParams } from "react-router-dom"
import useWebSocket from "react-use-websocket"
import useCrud from "../../hooks/useCrud"
import { Server } from "../../@types/server"

interface Message{
    sender: string;
    content: string;
    timestamp: string;
}

const MessageInterface = () => {

    const [message, setMessage] = React.useState("")
    const [newMessage, setNewMessage] = React.useState<Message[]>([]);
    const {serverId, channelId} = useParams();

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
        }
    })

  return (
    <>
        <div>
            {newMessage.map((msg:Message, index:number)=>{
                return (
                    <div key={index}>
                        <p>{msg.sender}</p>
                        <p>{msg.content}</p>
                    </div>
                );
            })}
        </div>
        <form>
            <label>
                Enter Message:
                <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
            </label>
        </form>
        <button onClick={() => {sendJsonMessage({type:"message", message})}}>
            SEND MESSAGE
        </button>
    </>
  )
}

export default MessageInterface
