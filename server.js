const fs = require('fs');
const http = require('http');
const uuid = require("uuid");
const dotenv = require('dotenv')
const socketio = require('socket.io')
const moment = require('moment');
const formatMessageMedia = require("./utils/messages_media");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
const Redis = require('ioredis');
const client = redis.createClient();

const messageDB = require('./models/Message')
const connectDB = require('./config/db')
const redisCache = require('./reddis-serve')
const redisGetCache = require('./reddis-serve')
const formatMessage = require("./utils/messages");
const userDb = require('./models/user.data.model')
const roomDb = require('./models/Chatroom')

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");

require("dotenv").config();


// Load config
dotenv.config({ path: './config/config.env' })

// Mongo dg connection 
connectDB()

const app = require('./app');
const server = http.createServer(app);
const io = socketio(server);

const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
    // console.log(io.of("/").adapter);

    // LIsten for joining chat room 
    socket.on("joinRoom", async ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        if (user.room) {

            socket.join(user.room);

            const roomInfo = await roomDb.find({ name: user.room })
            const roomId = await roomDb.findOne({ name: user.room })

            // if(roomId === null) throw new Error("error no room selected")

            console.log("roomId._id");
            console.log(roomId);
            // load older messeges
            const olderMesseges = await messageDB.find({ chatroom: roomId._id })

            // Send room info 
            socket.emit("roomInfo", roomInfo[0]);

            if (olderMesseges.length > 0) {

                // Send older  messeges 
                socket.emit("olderMesseges", olderMesseges);
                // Send users and room info
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room),
                });

            }
            if (olderMesseges.length === 0) {

                // Welcome current user
                // socket.emit("message", formatMessage(botName, "Welcome to ChatCord!: "+user.room));

                // Broadcast when a user connects
                socket.broadcast
                    .to(user.room)
                    .emit(
                        "message",
                        formatMessage(botName, `${user.username} has joined the chat`)
                    );

                // Send users and room info
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room),
                });

            }

            //    Load cache messages 
            const getRedisCache = async () => {
                // Connect to Redis at 127.0.0.1, port 6379.
                const redisClient = new Redis({
                    host: '127.0.0.1',
                    port: 6379,
                });

                // getting it back from redis: first geet the keys ; then get all the data
                const keys = await redisClient.lrange('messagesList', 0, -1) // 0, -1 => all items 
                console.log(keys);
                console.log(keys.length);

                if(keys.length !== 0)
                {
                    let keysArr = []
                    keys.map(res =>
                        keysArr.push(JSON.parse(res))
                    )
    
                    console.log(keysArr);
    
                    // Send older  messeges 
                    socket.emit("messagesCache", keysArr);
                }

            }
            getRedisCache() 
            


        }

    });


    // Listen for chatMessage
    socket.on("chatMessage", async (msg) => {
        console.log("msg");
        console.log(msg);
        const user = getCurrentUser(socket.id);
        console.log("user data");
        console.log(user);

        const userId_Db = await userDb.findOne({ displayName: user.username });
        const roomId_Db = await roomDb.findOne({ name: user.room });
        console.log("userId_Db");
        console.log(userId_Db);

        const time = moment().format('h:mm a')
        const date = moment().format('DD-MM-YYYY')

        await redisCache(formatMessage(user.username, msg, roomId_Db._id, userId_Db._id, roomId_Db.name)) 

        io.to(user.room).emit("message", formatMessage(user.username, msg, roomId_Db._id, userId_Db._id, roomId_Db.name));

    });
    

    // Listen for chatIMG upload
    socket.on("chatImg", async (img) => {

        const user = getCurrentUser(socket.id);

        const userId_Db = await userDb.findOne({ displayName: user.username });
        const roomId_Db = await roomDb.findOne({ name: user.room });
        console.log("userId_Db");
        console.log(userId_Db);

        const time = moment().format('h:mm a')
        const date = moment().format()

        const splitted = img.img.split(';base64,');
        const format = splitted[0].split('/')[1];

        const fileName = 'img-' + uuid.v4() + '-' + user.username + '.' + format


        const newMessage = new messageDB({
            chatroom: roomId_Db._id,
            chatroom_name: roomId_Db.name,
            user: userId_Db._id,
            user_name: userId_Db.displayName,
            media: fileName,
            message: "media",
            time: time .toString(),
            date: date.toString()
        });

        await newMessage.save()

        fs.writeFileSync('./assets/images/' + fileName, splitted[1], { encoding: 'base64' });

        io.to(user.room).emit("messageimg", formatMessageMedia(user.username, fileName));

        console.log("massage saved")

    });


    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});


const port = process.env.PORT || 8000

server.listen(port, () => {
    console.log("server listening on port 8000");
});

