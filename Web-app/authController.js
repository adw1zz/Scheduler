const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require("./config");
const path = require('path');
const transporter = require('./mailer');

const creatPath= (file) => path.resolve(__dirname,'ejs-views',file+'.ejs');
const creatNewPath = (file) => path.resolve(__dirname,'ejs-views/pages',file+'.ejs');

const generateAccessToken = (id, username) =>{
    const payload ={
        id, 
        username
    }
    return jwt.sign(payload,secret, {expiresIn: "24h"})
};

class authController{
    async registration(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Validation error", errors});
            }
            const {username,email,password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate){
                return res.status(400).json({message: 'This user exists'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, email, password: hashPassword});
            await user.save();
            await transporter.sendMail({
                to: `${email}`,
                subject: 'Congratulations, you have successfully registered on our service',
                text: 
                `Your 
                 login: ${username} 
                 password: ${password}`
            });
            return res.redirect('/');
        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req,res){
        try{
            const {username,password} = req.body;
            const user = await User.findOne({username});
            if (!user){
                return res.status(400).json({message: `${username} not found`});
            }
            const validPassword =bcrypt.compareSync(password, user.password);
            if (!validPassword){
                return res.status(400).json({message: `Incorrect password`});
            }
            const token = generateAccessToken(user._id, user.username);
            res.cookie("jwt",token);
            return res.redirect('/index');
        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async addPost(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Validation error", errors});
            }
            const {date,time,text} = req.body;
            const {id} = req.user;
            const post = new Post({userid:id,date,time,text});
            await post.save();
            return res.redirect('/new');
        }catch(e){
            console.log(e);
            res.status(400).json({message: 'Postig error'});
        }
    }

    logOut(req,res){
        res.clearCookie('jwt');
        return res.redirect('/');
    }

    getNew(req,res){
       return res.render(creatNewPath('new'));
    }

    async getIndex(req,res){
        try{
            const {id} = req.user;
            const posts = await Post.find({userid: id}).sort({date:1, time:1});
            return res.render(creatNewPath('index'),{posts});
        }catch(e){
            console.log(e);
            return res.status(400).json({message: 'Posts loading error'});
        }
    }

    async deletePost(req,res){
        try{
            await Post.findByIdAndDelete(req.params.id);
            res.status(200);
            return res.redirect('/index');
        }catch(e){
            console.log(e);
            return res.status(400).json({message: 'Deleting post error'});
        }
    }

    getReg(req,res){
       return res.render(creatNewPath('regisrtation'));
    }
    getLogin(req,res){
       return res.render(creatPath('login'));
    }
    getContacts(req,res){
       return res.render(creatNewPath('contacts'));
    }
    getAbout(req,res){
        return res.render(creatNewPath('about'));
    }
}

module.exports = new authController();