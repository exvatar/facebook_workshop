require("dotenv").config();
const express = require('express');
const db = require('./models')
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth',userRouter);
app.use('/post',postRouter);



app.listen(process.env.PORT);

db.sequelize.sync({force : false}).then(() => console.log(`runing ${process.env.PORT}`))