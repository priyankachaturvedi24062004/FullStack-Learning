const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');

/*app.use((req, res, next) => {
    console.log('Hii,I am First Middleware');
    next();
    console.log('Hii,This is after next() in First Middleware');
});

app.use((req, res, next) => {
    console.log('Hii,I am Second Middleware');
    next();
}); */

const checkToken = (req, res, next) => {
    let {token} = req.query;
    if (token === 'giveaccess') {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
};


app.get("/api", checkToken,(req, res) => {
    res.send('data');
});

app.use((req, res, next) => {
    console.log('I am only for random');
    next();
});





app.get('/', (req, res) => {
    res.send('Hi,I am root.');
});

app.get("/random", (req, res) => {
    res.send('Hi,I am random.');
});

app.get('/wrong', (req, res) => {
    abcd = abcd;
});


app.use((err, req, res, next) => {
    console.log("------Error------");
    res.send(err);
});




/*404
app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});*/


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

/*logger
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});*/