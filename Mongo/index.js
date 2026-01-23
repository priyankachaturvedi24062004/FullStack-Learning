const mongoose = require('mongoose');

main()
.then(() => {
    console.log('connection successful');
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

const User = mongoose.model('User', userSchema);;

const user2 = new User({
    name: 'Eve',
    age: 48,
    email: 'eve@yahoo.in',
});

user2
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
