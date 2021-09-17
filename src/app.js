const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

app.use(express.json());
//extend:::true 'foo[bar]=baz' parse foo{bar:'baz'} (ver npm qs)
//false '?foo=bar' -> foo:{'bar'}
app.use(express.urlencoded({extended: true}))

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
  
// Load models
const Mentions = require('./models/mentions');
console.log('################################################')
console.log()

/* db.on('event', (eventName) => {
    switch (eventName){
        case 'connected':
            console.log('Mongoose default connection is open');
            break;
        case 'error':
            console.log(`Mongoose default connection has occured \n${err}`);
            break;    
        case 'disconnected':
            console.log('Lost connection with MongoDB Atlas.');
            break;
    }
})
 */

/* try{
    db.on('connected', () => {
        console.log('Mongoose default connection is open');
    })
} catch {
    db.on('error', () => {

    })
        console.log()
} finally{
    
} */

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

module.exports = app;