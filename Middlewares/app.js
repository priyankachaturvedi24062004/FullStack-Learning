const exress = require('express');
const app = exress();

/*app.use((req, res, next) => {
    console.log('Hii,I am First Middleware');
    next();
    console.log('Hii,This is after next() in First Middleware');
});

app.use((req, res, next) => {
    console.log('Hii,I am Second Middleware');
    next();
}); */

app.use((req, res, next) => {
    let {token} = req.query;
    if (token === 'giveaccess') {
        next();
    }
    res.send("ACCESS DENIED!");
});

app.use((req, res, next) => {
    console.log('I am only for random');
    next();
});

app.get("/api", (req, res) => {
    res.send('data');
});

/*logger
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});*/

app.get('/', (req, res) => {
    res.send('Hi,I am root.');
});

app.get("/random", (req, res) => {
    res.send('Hi,I am random.');
});

//404
app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});



app.listen(8080, () => {
    console.log('Server is running on port 8080');
});