const http = require("http");
const websocketServer = require("websocket").server
let connections = [];

const httpserver = http.createServer()
const websocket = new websocketServer({"httpServer": httpserver})

httpserver.listen(8080, () => console.log("runnig on port 8080"))

websocket.on("request", request => {
    const connection = request.accept(null, request.origin)
    connection.on("message", message => {
        connections.forEach(c => c.send(`user:${connection.socket.remotePort} says: ${JSON.stringify(message.utf8Data)}`))
    })

    connections.push(connection);
    connections.forEach(c => c.send(`user:${connection.socket.remotePort} just connected`))
})


//try this 
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`${message.data}`)