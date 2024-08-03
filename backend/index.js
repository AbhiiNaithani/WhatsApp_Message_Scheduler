const express = require('express')
const cors = require( 'cors' );
const mainRouter = require('./src/routes')
const http = require('http');

const { frontend_URL } = require('./src/constants');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: frontend_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Allow credentials like cookies, authorization headers, etc.
  }));

app.use(express.json());

app.use('/api/v1/',mainRouter);

const server = http.createServer(app);
const {Server} = require('socket.io');
const {startSession,} = require('./src/services/WhatsappClient');

const io = new Server(server,{
    cors: {
        origin: frontend_URL,
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        credentials: true
      }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket?.id)
    
    socket.on('disconnect', () => { 
        console.log('user disconnected');
    });

    socket.on('connected', (data) => {
        console.log('connected to the server ', data);
        socket.emit("hello", "Hello from the server");
    });

    socket.on('startSession', async () => {
        await startSession({socket});
    })
});

server.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});



