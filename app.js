const express = require('express');
const mongoose = require('mongoose');
const { dirname } = require('path');

const app = express();

const db = require('../config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log('MongoDB connected')})
.catch(err => {console.log(err)});

// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: false}));
app.use(express.static(__dirname));
app.use('/',require('./routes/Main/index'));
app.use('/signup/first',require('./routes/Signup/page1'));
app.use('/signup/second',require('./routes/Signup/page2'));
app.use('/signup/third',require('./routes/Signup/page3'));
app.use('/signup/face',require('./routes/Signup/face'));
app.use('/signup/sucessfull',require('./routes/Signup/sucessfull'));
app.use('/login/first',require('./routes/Login/page1'));
app.use('/login/dashboard',require('./routes/Login/dashboard'));
app.use('/login/forgetPassword',require('./routes/Login/forgetPassword'));
app.use('/login/recoverPassword',require('./routes/Login/recoverPassword'));
app.use('/login/face',require('./routes/Login/face'));
app.use('/login/paymentDone',require('./routes/Login/paymentDone'));
app.use('/login/paymentUndone',require('./routes/Login/paymentUndone'));
app.use('/login/payWithPin',require('./routes/Login/payWithPin'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
