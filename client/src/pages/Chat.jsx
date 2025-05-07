import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef();

  useEffect(() => {
    socket.emit("join", "global");
    socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    if (!text) return;
    socket.emit("message", { room: "global", user: "Anonymous", text });
    setText("");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 500,
        }}
        elevation={3}
      >
        <Typography variant="h5" mb={2} align="center">
          Chat Room
        </Typography>
        <Box ref={listRef} sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
          <List>
            {messages.map((m, i) => (
              <ListItem key={i} sx={{ py: 0.5 }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  {m.user}:
                </Typography>
                <Typography variant="body1">{m.text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button variant="contained" onClick={send}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
