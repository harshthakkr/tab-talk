"use client";

import { io } from "socket.io-client";

// Connect to the WebSocket server running on port 4000
export const socket = io("http://localhost:4000");
