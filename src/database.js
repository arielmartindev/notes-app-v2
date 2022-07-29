const mongoose = require('mongoose');
const config = require('../config')

mongoose.connect('mongodb+srv://' + config.ATLAS + '@cluster0.fxkda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));