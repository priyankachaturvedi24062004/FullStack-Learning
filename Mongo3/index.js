const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError.js');


main()
.then(() => console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Index route
app.get("/", async(req, res) => {
    try{
        let chats = await Chat.find({})
        //console.log(chats);
        res.render("index.ejs", {chats});
    } catch(err) {
        next(err);
    }
  
});

//New chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});


//create chat route
app.post("/chats", async(req, res, next) => {
    try{
        let { from, to, msg } = req.body;

        let newChat = new Chat({
            from,
            to,
            msg,
            created_at: new Date()
        });

        await newChat.save();
        console.log("chat saved");
        res.redirect("/");
    } catch(err) {
        next(err);
    }
});


function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err) => next(err));
    };
}


//New - show chat route
app.get("/chats/:id", asyncWrap (async(req, res, next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
        return next(new ExpressError(404, "Chat not found!"));
    }
        res.render("show.ejs", {chat});
    }));



//edit chat route
app.get("/chats/:id/edit",(async(req, res, next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat){
        return next(new ExpressError(404, "Chat not found!"));
    }
        res.render("edit.ejs",{chat});
    }));

//update chat route
app.put("/chats/:id",async (req, res) => {
    try{
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        console.log(newMsg);
        let chat = await Chat.findByIdAndUpdate(
        id, 
        {msg: newMsg},
        {runValidators: true, new: true}
);

        console.log("updatedChat", chat);
        res.redirect("/");
    } catch(err) {
        next(err);
    }
    
});

//delete chat route
app.delete("/chats/:id", async(req, res) => {
    try{
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log("deletedChat", deletedChat);
        res.redirect("/");
    } catch(err) {
        next(err);
    }
   
});

const handleValidationError = (err) => {    
    console.log("This was a validation error.Please follow rules");
    console.dir(err.message);
    return err;
}

app.use((err,req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError"){
        err = handleValidationError(err);
    }
    next(err);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something Error Occurred" } = err;
    res.status(status).send(message);
});


app.listen(8080,() =>{
    console.log("server is listening on port 8080");
});
