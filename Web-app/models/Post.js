const {Schema,model} = require('mongoose');

const Post = new Schema({
    userid:{
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
});

module.exports = model('Post',Post);