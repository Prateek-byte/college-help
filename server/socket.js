export const handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (room) => {
      socket.join(room);
    });

    socket.on('message', ({ room, user, text }) => {
      io.to(room).emit('message', { user, text, timestamp: new Date() });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
