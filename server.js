// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var flash    = require('connect-flash');

var path = require('path');
var multer = require('multer');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// // set storage engine for multer
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null, file.fieldname  + '-' + Date.now() + path.extname(file.originalname))
//   }
// });
//
// // init uploads
// var upload = multer({
//   storage : storage,
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('proPic')
//
// // check file typer
//
// function checkFileType(file, cb){
//   // allowed ext
//   const fileTypes = /jpeg|jpg|png|gif/;
//   // check ext
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   // cehck mime type
//   const mimeType = fileTypes.test(file.mimetype);
//   if(mimeType && extName){
//     return cb(null,true);
//   }else{
//     cb('Error: Images Only!')
//   }
// }

//---------------------------------------
// IMAGE CODE
//---------------------------------------
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

app.post('/up', upload.single('file-to-upload'), (req, res, next) => {

    insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
        db.close();
        res.json({'message': 'File uploaded successfully'});

    });
});

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('profilePics');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        //assert.equal(err, null);
        callback(result);

        console.log(result);

    });
}
//---------------------------------------
// IMAGE CODE END
//---------------------------------------

// // post profile pic
//
// app.post('/upload', (req, res) => {
// console.log(req.user) ;
//
//   upload(req,res,(err)=>{
//     if(err){
//       res.render('profile',{
//         user: req.user,
//         msg:err
//       });
//     }else{
//       if(req.file == undefined){
//         res.render('profile',{
//           user: req.user,
//           msg: 'Error: No File Selected!'
//         });
//       }else{
//         res.render('profile',{
//           user: req.user,
//           msg: 'File Uploaded',
//           file: 'uploads/${req.file.filename}'
//         });
//       }
//       console.log(req.file);
//     }
//   })
// })

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, { useMongoClient: true }, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database



require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2018a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
