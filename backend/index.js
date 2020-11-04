require("dotenv").config();
require("./config/passport");
const express = require('express');
const db = require('./models')
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment')


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth',userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);



app.listen(process.env.PORT);

db.sequelize.sync({force : false}).then(() => console.log(`runing ${process.env.PORT}`))