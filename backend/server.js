const express = require('express');
const http = require('http');
// const socketIO = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// const io = socketIO(server, {
//   cors: {
//     origin: '*', // Set appropriate origin if '*' doesn't work for you
//   },
// });

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("img_uploads"));


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/bulletins', require('./routes/api/bulletins'));

// Routes for app users
app.use('/auth', require('./routes/api/app_auth'));
app.use('/appbulletin', require('./routes/api/app_bulletins'));
 
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// // Socket.io connection
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Example: Handle a chat message event
//   socket.on('chat message', (msg) => {
//     console.log('Message from client:', msg);

//     // Broadcast the message to all connected clients
//     io.emit('chat message', msg);
//   });

//   // Handle disconnect event
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
