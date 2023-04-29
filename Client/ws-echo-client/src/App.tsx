import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      setServerResponse(event.data);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(value);
    }
  };

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <div>server says: {serverResponse}</div>
      <button onClick={sendMessage}>send</button>
    </>
  );
}

export default App;
