import io from "socket.io-client";
const URL = "https://jomaasbackendai.onrender.com";

export const socket = io.connect(URL);
