const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
  socket.id = counter++;

  console.log('Client connected');
  socket.write('Welcome new client!\n');
  socket.write('Please enter your name : ');

  socket.on('data', data => {
      if(!sockets[socket.id]){
          socket.name = data.toString().trim();
          socket.write(`Welcome ${socket.name}!\n`);
          sockets[socket.id] = socket;
          Object.entries(sockets).forEach(([sid, cs]) => {
            if (sid != socket.id) {
              cs.write(`${socket.name}: Is on the chat\n`);
            }
          });
          return;
      }
    Object.entries(sockets).forEach(([sid, cs]) => {
      if (sid != socket.id) {
        cs.write(`${socket.name}: `);
        cs.write(data);
      }
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    Object.entries(sockets).forEach(([, cs]) => {
        cs.write(`${socket.name}: Is disconnected\n`);
      });
    console.log('Client disconnected');
  });
});

server.listen(8000, () => console.log('Server bound'));