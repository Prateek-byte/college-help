import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import resourceRoutes from './routes/resources.js';
import { handleSocket } from './socket.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(5000, () => console.log('Server running on port 5000'));
});

handleSocket(io);
