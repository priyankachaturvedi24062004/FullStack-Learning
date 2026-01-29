const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


main()
.then(() => console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


//Index route
app.get("/", async(req, res) => {
  let chats = await Chat.find()
  //console.log(chats);
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

//update chat route
app.put("/chats/:id",async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);
    let chat = await Chat.findByIdAndUpdate(
        id, 
        {msg: newMsg},
        {runValidators: true, new: true}
);

    console.log("updatedChat");
    res.redirect("/");
});


app.listen(8080,() =>{
    console.log("server is listening on port 8080");
});
