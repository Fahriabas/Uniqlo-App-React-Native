const Redis = require("ioredis")
const redis = new Redis({
    host: "redis-10645.c302.asia-northeast1-1.gce.cloud.redislabs.com",
    password: "Eoh4LXCClVU3dNLvlLU58SZORah4VHzA",
    port: 10645
})

module.exports = redis



// import { createClient } from 'redis';

// const client = createClient({
//     password: 'Eoh4LXCClVU3dNLvlLU58SZORah4VHzA',
//     socket: {
//         host: 'redis-10645.c302.asia-northeast1-1.gce.cloud.redislabs.com',
//         port: 10645
//     } 
// });