// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword
}
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8yD3fN_xKXbkfgIGkYOuz0EmQqAMfezc",
    authDomain: "database-11d60.firebaseapp.com",
    databaseURL: "https://database-11d60-default-rtdb.firebaseio.com",
    projectId: "database-11d60",
    storageBucket: "database-11d60.appspot.com",
    messagingSenderId: "973482468465",
    appId: "1:973482468465:web:0044cb64b0ab32b09767d0",
    measurementId: "G-Y5KDD4PWGZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

var email = document.getElementById('email');
var password = document.getElementById('password');

window.login = function (e) {
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value,
    }
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            console.log(success.user.uid);
            window.location.replace('app.html')
        })
        .catch(function (err) {
            console.log(err);
        })
    console.log(obj);
}