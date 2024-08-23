require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8000;

const cookieParser = require('cookie-parser')

const {connectToMongoDB} = require("./connection");
const cartRoutes = require('./routes/cart');

connectToMongoDB("mongodb://localhost:27017/twitter-backend").then(()=> console.log('mongoDb coneected'))
.catch(error => console.error('error connecting to mongoDB', error))

const corsOptions ={
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions));
const userRoute = require('./routes/user');


app.use(express.json());

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/users', userRoute);
app.use('/cart', cartRoutes);


app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));