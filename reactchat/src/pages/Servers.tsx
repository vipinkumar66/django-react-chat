import React from "react"
import useWebSocket from "react-use-websocket"

const websocketUrl = "ws://127.0.0.1:8000/ws/test"



const Servers = () => {

    const [message, setMessage] = React.useState("")
    const [newMessage, setNewMessage] = React.useState<string[]>([]);

    const { sendJsonMessage } = useWebSocket(websocketUrl, {
        onOpen: () =>{
            console.log("Connected")
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
            {newMessage.map((msg, index)=>{
                return (
                    <div key={index}>
                        <p>{msg}</p>
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

export default Servers
