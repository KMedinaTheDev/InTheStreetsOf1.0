module.exports = function(app, passport, db, ObjectId) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    // app.get('/', function(req, res) {
    //     res.render('index.ejs',{
    //       message:res
    //     });
    // });

    // test
    app.get('/', function(req, res) {
   db.collection('messages').find().toArray((err, result) => {
     if (err) return console.log(err)
     res.render('index.ejs', {
       messages: result
     })
   })
 });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      console.log(req)
        db.collection('messages').find().toArray((err, result) => {

          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,

            messages: result,
          })
        })
    });

    // get photos
    app.get('/profilePics/:id', function(req, res) {
  uId = ObjectId(req.params.id)
  console.log(uId)
  db.collection('profilePics').findOne({"_id": uId}, (err, result) => {
    if (err) return console.log(err)
    console.log(result)
    res.render('index.ejs', {
      file: 'uploads/${req.file.filename}'
    })
  })
});

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').save({email: req.body.email, name: req.body.name, location:req.body.location, shelterList: req.body.shelterList, story: req.body.story, gameplan: req.body.gameplan, asks: req.body.asks, size: req.body.size, updates: req.body.updates}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    // app.put('/messages', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({ name: req.body.name, email: req.body.email,location:req.body.location, story: req.body.story, gameplan: req.body.gameplan, asks: req.body.asks, size: req.body.size, updates: req.body.updates }, {
    //     $set: {
    //       thumbUp:req.body.thumbUp + 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // update user with  image

    // app.put('/users/:id', function(req, res) {
    //    var uId = ObjectId(req.params.id)
    //    console.log(uId)
    //    db.collection('users').findOneAndUpdate({"_id": uId}, {
    //      $set: {
    //        photo:req.file.filename
    //      }
    //    }, {
    //      sort: {_id: -1},
    //      upsert: true
    //    }, (err, result) => {
    //      if (err) return console.log(err)
    //      console.log(result)
    //      res.send(err)
    //      res.send(result)
    //    })
    //  })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
