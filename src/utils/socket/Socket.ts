import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.1.6:3000";

const Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false, // Default false, manually connect kro
});

export default Socket;
