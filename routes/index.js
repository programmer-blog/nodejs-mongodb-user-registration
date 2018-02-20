var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var User      = mongoose.model('Users');
var crypto    = require('crypto'), hmac, signature;
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize }   = require('express-validator/filter');

   /* GET home page. */
  router.get('/', function(req, res, next) {
      res.render('index', { title: 'Nodejs user registration'});
   })
   
  /* POST user registration page. */
  router.post('/register',[ 
   
    check('full_name','Name cannot be left blank')
    .isLength({ min: 1 }),
   
    check('email')
    .isEmail().withMessage('Please enter a valid email address')
    .trim()
    .normalizeEmail()
    .custom(value => {
        return findUserByEmail(value).then(User => {
          //if user email already exists throw an error
      })
    }),

    check('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain one number')
    .custom((value,{req, loc, path}) => {
      if (value !== req.body.cpassword) {
          // throw error if passwords do not match
          throw new Error("Passwords don't match");
      } else {
          return value;
      }
  }),

  check('gender','Please select gender')
    .isLength({ min: 1 }),

    check('dob','Date of birth cannot be left blank')
    .isLength({ min: 1 }),
    
    check('country','Country cannot be left blank')
    .isLength({ min: 1 }),
    
    check('terms','Please accept our terms and conditions').equals('yes'),

   ], function(req, res, next) {

      const errors = validationResult(req);

    if (!errors.isEmpty()) {     
        
       res.json({status : "error", message : errors.array()});

    } else {

        hmac = crypto.createHmac("sha1", 'auth secret');
        var encpassword = '';

        if(req.body.password){
          hmac.update(req.body.password);
          encpassword = hmac.digest("hex");
        }
        var document = {
            full_name:   req.body.full_name, 
            email:       req.body.email, 
            password:    encpassword, 
            dob:         req.body.dob, 
            country:     req.body.country, 
            gender:      req.body.gender, 
            calorie:     req.body.calorie, 
            salt:        req.body.salt 
          };
        
        var user = new User(document); 
        user.save(function(error){
          console.log(user);
          if(error){ 
            throw error;
          }
          res.json({message : "Data saved successfully.", status : "success"});
       });    
    }
});

function findUserByEmail(email){

  if(email){
      return new Promise((resolve, reject) => {
        User.findOne({ email: email })
          .exec((err, doc) => {
            if (err) return reject(err)
            if (doc) return reject(new Error('This email already exists. Please enter another email.'))
            else return resolve(email)
          })
      })
    }
 }


module.exports = router;