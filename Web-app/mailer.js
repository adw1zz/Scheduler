const nodemailer = require('nodemailer');

module.exports = 
    transporter=nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure:true,
        auth: {
            user: 'your mail',
            pass: 'password'
        }
    },
    {
        from: "Scheduler server <your mail>",
    }
);

