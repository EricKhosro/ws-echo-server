import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log(data.toString());

    ws.send(data.toString());
  });
});
