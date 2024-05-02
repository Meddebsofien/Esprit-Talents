const initializeWebSocket = (server) => {
    const io = require('socket.io')(server);
  
    // WebSocket handler
    io.on('connection', (socket) => {
      console.log('A user connected');
  
      socket.on('message', (data) => {
        console.log('Message:', data);
        io.emit('message', data);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
};

module.exports = initializeWebSocket;
