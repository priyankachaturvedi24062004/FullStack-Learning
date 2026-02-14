const exress = require('express');
const app = exress();

app.use((req, res, next) => {
    console.log('Hii,I am First Middleware');
    next();
    console.log('Hii,This is after next() in First Middleware');
});

app.use((req, res, next) => {
    console.log('Hii,I am Second Middleware');
    next();
}); 

app.get('/', (req, res) => {
    res.send('Hi,I am root.');
});

app.get("/random", (req, res) => {
    res.send('Hi,I am random.');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});