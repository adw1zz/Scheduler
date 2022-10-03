const jwt = require('jsonwebtoken');
const {secret} =require('../config');
const path = require('path');
const { exit } = require('process');

const creatPath= (file) => path.resolve(__dirname,'../ejs-views',file+'.ejs');

module.exports = function(req,res,next){
  if (req.method === "OPTIONS"){
      next()
  } 

  if (req.method === "GET" && req.url ==="/"){
    try {
      const token = req.headers.cookie;
      if (!token){
        return res.render(creatPath('login'));
      }
      return res.redirect('/index');
    }catch(e){
        console.log(e);
        return res.status(403).json({message: "User not authorized"});
    }
  }
  
  if (req.method === "GET"){
    try {
      const token = req.headers.cookie.split('=').pop();
      if (!token){
          return res.redirect('/');
      }
      const decodedData = jwt.verify(token,secret);
      req.user = decodedData;
      next();
    }catch(e){
        console.log(e);
        return res.status(403).json({message: "User not authorized"});
    }
  }

  if (req.method === "POST"){
    try {
      const token = req.headers.cookie.split('=').pop();
      if (!token){
        return  res.redirect('/');
      }
      const decodedData = jwt.verify(token,secret);
      req.user = decodedData;
      next();
    }catch(e){
        console.log(e);
        return res.status(403).json({message: "User not authorized"});
    }
  }

  if (req.method === "DELETE"){
    try{
      const token =req.headers;
      if (!token){
        return res.redirect('/');
      }
      next();
    }catch(e){
      console.log(e);
      return res.status(403).json({message: "User not authorized"})
    }
  }

};