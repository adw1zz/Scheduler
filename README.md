# Scheduler

This application has the following functionality: authorization/authentication/registration (notifications are sent to the email address by which the user was registered), ability to create and delete your notes (notes are sorted by date; when the date in the note coincides with the current one, an alert is sent to the user's email). Instead of error pages, I used the error message output in json format. 

There are some packeges for different purposes:
- bcryptjs
- ejs
- express
- express-validator
- jsonwebtoken
- mongoose
- nodemailer

Database: MongoDb.

