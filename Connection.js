const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api', require('./mysql.js'));
app.use('/api', require('./mongo.js'));
app.use('/api', require('./redis.js'));
app.use(express.static('client/build'));
app.get('*', (req, res) => res.sendFile(path.resolve('client/build', 'index.html'));

app.listen(PORT, console.log("running on port "+ PORT));