const express = require('express');
const db = require('./models')
const userRouter = require('./routes/user');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth',userRouter);


app.listen(8000);

db.sequelize.sync({force : false}).then(() => console.log('runing'))