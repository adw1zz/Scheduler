const { TIMEOUT } = require('dns');
const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const { isTypedArray } = require('util/types');
const authRouter = require('./authRouter');
const app = express();
const transporter = require('./mailer');
const Post = require('./models/Post');
const User = require('./models/User');
const datetime = new Date();
//const timer = setInterval(spammer,2000);

app.set('view engine','ejs');

const PORT = 3000;
const db = 'your db link to connect';

mongoose
    .connect(db)
    .then((res) => console.log('Connect to DB'))
    .catch((error) => console.log(error));

//notification
async function spammer(){
    const posts = await Post.find();
    posts.forEach(async ({date, userid}) => {
        const array = date.split('-');
        if (array[0] == datetime.getFullYear() && array[1] == datetime.getMonth()+1 && array[2] == datetime.getDate()){
            const {email} = await User.findById(userid);
            await transporter.sendMail({
                to: `${email}`,
                subject: 'Check your plans for today',
                text: `It seems that you had some plans for today.`
            });
        }
    });
}

app.listen(PORT,'localhost',(error,posts) =>{
    error ? console.log(error): console.log('listening port', PORT);
    ///timer.ref();
});

app.use(express.static('ejs-views'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/",authRouter);