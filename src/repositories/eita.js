const mongoose = require('mongoose');

exports.setCollName = (collName) => {
    return mongoose.model('Login', collName)
}