const express = require('express');
const router = express.Router()
const firebase = require("../firebase");


router.post("/signinWithEmail", function(request, response){
});

router.post("/signinWithGoogle", function(request, response){
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    
})

// To test this route on POSTMAN, Choose Body -> form-urlencoded
router.post("/signupWithEmail", function(req, res) {
    let firstName   = req.body.firstName;
    let lastName    = req.body.lastName;
    let nickname    = req.body.nickname;
    let email       = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let username    = req.body.username
    let password    = req.body.password;
    
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(userRecord){
      console.log(userRecord.user);
      firebase.database().ref('users/' + userRecord.user.uid).set({
        firstName,
        lastName,
        nickname,
        email,
        phoneNumber,
        username,
        
      });
      res.status(200).end();
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      res.send({errorCode, errorMessage});
    });
})

router.post("/signupWithGoogle", function(request, response){
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider).then(function(data) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.data;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
})

module.exports = router;