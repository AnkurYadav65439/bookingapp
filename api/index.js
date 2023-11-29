import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'

dotenv.config();

mongoose.connect(process.env.MONGO);

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, ()=>{
    console.log('Server listening on port' , port);
})

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);