import React from "react"
import useWebSocket from "react-use-websocket"

const websocketUrl = "ws://127.0.0.1:8000/ws/test"



const Servers = () => {

    const [message, setMessage] = React.useState("")
    const [inputValue, setInputValue] = React.useState("")

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
            const mesg = (msg.data)
            setMessage(mesg)
        }
    })

    const helloMessage = () =>{
        const message = {text: inputValue}
        sendJsonMessage(message)
        setInputValue("")
    }

  return (
    <>
        SERVER
        <div>
            <input type="text"
            value = {inputValue}
            onChange={(e) => setInputValue(e.target.value)} />
        </div>

        <div>
            <button onClick={helloMessage}>Send Message</button>
            Recieved: {message}
        </div>
    </>
  )
}

export default Servers
