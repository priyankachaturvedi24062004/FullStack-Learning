const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));


main()
.then(() => console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


//Index route
app.get("/", async(req, res) => {
  let chats = await Chat.find()
  console.log(chats);
  res.render("index.ejs", {chats});
});

//New chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});


//create chat route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });

    newChat.save()
        .then(() => {
            console.log("chat saved");
            res.redirect("/");   // ✅ CORRECT
        })
        .catch(err => {
            console.log(err);
        });
});

//edit chat route
app.get("/chats/:id/edit", async(req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.listen(8080,() =>{
    console.log("server is listening on port 8080");
});
