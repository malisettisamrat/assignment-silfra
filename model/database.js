const mongoose = require('mongoose');

require('dotenv').config();
require('./studentModel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Success.') }
    else { console.log('Error in DB connection : ' + err) }
});
