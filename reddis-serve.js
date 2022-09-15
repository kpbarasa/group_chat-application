const Redis = require('ioredis');
const messageDB = require('./models/Message')

const redisCache = async (message) => {
    
    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
    });

    // Set key "myname" to have value "Simon Prickett".
    await redisClient.rpush('messagesList', `${JSON.stringify(message)}`)

    // getting it back from redis: first geet the keys ; then get all the data
    const keys = await redisClient.lrange('messagesList', 0, -1) // 0, -1 => all items

    if(keys.length !== 0){

        // console.log(keys);
        // console.log(JSON.parse(keys[0]));
        // console.log(keys.length);  
    
        let keysArr = []
        keys.map(res =>
            keysArr.push(JSON.parse(res))
            )
        console.log(keysArr);
    
        // Count number of cached messages if maximum reached save to db 
        if(keys.length > 2){
            keysArr.map(res => {
    
                const newMessage = new messageDB({ // message object
                    chatroom: res.chatroom,
                    chatroom_name: res.chatroom_name,
                    user: res.user,
                    user_name: res.username,
                    message:res.text,
                    time:res.time,
                    date:res.date
                });
                
                newMessage.save() // Save to database
                .then(() => console.log("massage saved"))
    
                redisClient.flushdb() // Clear cache
    
            })
        }
    }

    // Disconnect from Redis.
    redisClient.quit();
};

const redisGetCache = async () => {

    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
    });

    // getting it back from redis: first geet the keys ; then get all the data
    const keys = await redisClient.lrange('messagesList', 0, -1) // 0, -1 => all items 
     return keys
}



module.exports = redisCache;