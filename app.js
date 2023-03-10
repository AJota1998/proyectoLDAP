var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/** DAW: Dependencia del middleware
 * @author prof.antoniogabriel
*/
const bodyParser = require('body-parser'); // middleware


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/** DAW: Dependencia del enrutamiento del login
 * @author prof.antoniogabriel
 */
var loginRouter = require('./routes/login');

var app = express();

/** DAW: Se añade las opciones de configuración del bodyParer
 * @author prof.antoniogabriel
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/** DAW: Se añade el enrutamiento del login
 * @author prof.antoniogabriel
 */
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


