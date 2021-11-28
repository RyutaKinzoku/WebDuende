const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api', require('./mysql.js'));
app.use('/api', require('./mongo.js'));
app.use('/api', require('./redis.js'));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(process.env.PORT || 3001, function(){
    console.log("running on port 3001", this.address().port, app.settings.env)
});