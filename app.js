// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
   getDatabase,
   ref,
   push,
   set,
   remove,
   onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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
const database = getDatabase();

// var input = document.getElementById('input');
var arr = [];
var todoInp = document.getElementById("todoInp");
var parent = document.getElementById("parent");

function sendData() {
   var obj = {
      task: todoInp.value,
      dateTime: JSON.stringify(new Date()),
   }
   console.log(obj)
   const keyref = ref(database, 'task/');
   obj.id = push(keyref).key;
   console.log(obj.id);

   const taskref = ref(database, `task/${obj.id}/`);
   set(taskref, obj);
}
function renderUL() {
   parent.innerHTML = "";
   for (var i = 0; i < arr.length; i++) {
      parent.innerHTML += `<li>${arr[i].task}<br><span class='label'>${arr[i].time}<span></li><button onclick="delItem('${arr[i].id}')">Delete</button>`;
   }
}
window.addTask = function (e) {
   e.preventDefault();
   var obj = {
      task: todoInp.value,
      time: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} T ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
      userName: "ABC",
   };

   arr.push(obj);
   renderUL();
   sendData();

};
window.getData = function () {
   arr=[];
   const taskRef = ref(database, 'task/');
   onChildAdded(taskRef, function (data) {
      for(var i = 0; i < arr.length; i++){
      parent.innerHTML += `<li>${(data.val().task)}</li>`;
      }
      console.log(data.val())
   })

}
window.logout = function () {
   console.log("Logout Successfully");
   window.location.replace("login.html");
}
window.delItem = function (id) {
   const taskReference= ref(database,`task/${id}`);
   console.log(taskReference);
   
   remove(taskReference)
      .then(function (e) {
         console.log(e)
         // getData()
      })
      .catch(function (er) {
         console.log(er)
      })
}

