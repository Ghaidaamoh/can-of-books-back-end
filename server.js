'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new mongoose.Schema({

    name: String,
    description: String ,
    status: String ,
    img: String

});
const userDataDb = new mongoose.Schema({
    email:  String,
    books: [bookSchema]
});
const bookModel = mongoose.model('book', bookSchema);
const userModel = mongoose.model('User', userDataDb);

function seedUserCollection() {

    const ghaidaa = new userModel(
        
        {
        email: 'ghaidaa97mohammad@gmail.com',
        books: [
            { name: 'The Growth Mindset', 
            description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', 
            status: 'FAVORITE FIVE', 
            img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },

            { name: 'The Momnt of Lift', 
            description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
            status: 'RECOMMENDED TO ME', 
            img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg' }
        ]
    })

     ghaidaa.save();
}


//  seedUserCollection();


// proof of life
app.get('/', homePageHandler);


function homePageHandler(req, res) {
    res.send('all good')
}


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

//http://localhost:3008/book?userEmail=ghaidaa97mohammad@gmail.com

app.get('/book',getBook);

function getBook(req,res) {
    let userEmail = req.query.userEmail;
    
    userModel.find({email:userEmail},function(error,userInfo){
        if(error) {
            res.send('did not work')
        } else {
            res.send(userInfo[0].books)
        }
    })
}