const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(() => console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}


let allChats = [
    {
    from : "Taslima",
    to : "priyanka",
    msg : "Hello priyanka! This is Taslima.",  
    created_at : new Date()
    },
    {
    from : "Eve",
    to : "Tiya",
    msg : "What are you doing!",  
    created_at : new Date()
    },
    {
    from : "Tom",
    to : "Cat",
    msg : "Hello Cat! This is Tom.",  
    created_at : new Date()
    },
]

Chat.insertMany (allChats);
