// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');


// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/spotify', SpotifyLoginRouter)
// app.use('/Spotify', SpotifyLoginRouter)

// app.use('/signUp', signUpRouter)
//     // app.use('/Spotify/login', SpotifyLoginRouter);
//     // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });


// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// module.exports = app;

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

var signUpRouter = require('./routes/SignUp')
var SpotifyLoginRouter = require('./routes/Spotify')
const friendsRouter = require('../backend/routes/FriendsRouter.js');
const groupsRouter = require('../backend/routes/GroupsRouter.js');
const tasksRouter = require('../backend/routes/TasksRouter.js');
const settingsRouter = require('../backend/routes/Settings.js');
const ActivityRouter = require('../backend/routes/ActivityRouter.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/testAPI', testAPIRouter);
app.use('/friends', friendsRouter);
app.use('/groups', groupsRouter);
app.use('/tasks', tasksRouter);
app.use('/spotify', SpotifyLoginRouter)
app.use('/Spotify', SpotifyLoginRouter)
app.use('/signUp', signUpRouter)
app.use('/settings', settingsRouter);
app.use('/activity', ActivityRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// const PORT = 9000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


module.exports = app;