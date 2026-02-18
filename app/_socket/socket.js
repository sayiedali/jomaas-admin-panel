import io from "socket.io-client";
const URL = "https://jomaas-backend.onrender.com";

export const socket = io.connect(URL);
