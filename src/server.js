const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

function connect() {
  if (process.env.NODE_ENV === 'test') {
    console.log("THIS IS MOCKGOOSE BLOCKKK")
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(
          process.env.DB_CONNECT,
          { useNewUrlParser: true }
        );
      })
  } else {
    mongoose.connect(
      process.env.DB_CONNECT,
      { useNewUrlParser: true },
      () => console.log('connected to db')
    );
  }

}

connect();

// // Middleware
// app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const testAPI = require('./routes/testAPI')

const authRoutes = require('./routes/auth')
const survey = require('./routes/survey')
const post = require("./routes/post")
const postComment = require("./routes/postComment")
const search = require('./routes/search')
const radar = require('./routes/radarlist')
const debate = require('./routes/debate')
const option = require('./routes/option')
const vote = require('./routes/vote')
const notif = require('./routes/notif')
const picks = require('./routes/picks')
const trivia = require('./routes/trivia')

app.use(cors({ origin: '*' }));

app.use('/testAPI', testAPI);
app.use('/user', authRoutes);
app.use('/survey', survey);
app.use('/post', post);
app.use('/post/:id/postComment', postComment);
app.use('/search', search);
app.use('/debate', debate);
app.use('/option', option);
app.use('/vote', vote);
app.use('/radar', radar);
app.use('/notif', notif);
app.use('/picks', picks);
app.use('/trivia', trivia);

app.listen(port);//, () => console.log(`Listening on port ${port}`));
module.exports = ({ connect, app });
