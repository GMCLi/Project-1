$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
        authDomain: "rps-game-ce388.firebaseapp.com",
        databaseURL: "https://rps-game-ce388.firebaseio.com",
        projectId: "rps-game-ce388",
        storageBucket: "rps-game-ce388.appspot.com",
        messagingSenderId: "138684371598"
      };
      firebase.initializeApp(config);

   var database=firebase.database();
    var auth=firebase.auth()
    var user={  uid:"empty",
                user_name:"empty",
                user_email:"empty",
                update:function(user_info){
                    this.uid=user_info.uid
                    this.user_name=user_info.display_name
                    this.user_email=user_info.email
                }

    }
   document.getElementById("sign-in").addEventListener("click",function(){
        var name=document.getElementById("Username").textContent
        var email=document.getElementById("email").textContent
        var password=document.getElementById("password").textContent
        // var email="ramoncarlosjulian@yahoo.com"
        // var password="password"
        // var name="Hello"

        auth.createUserWithEmailAndPassword(email, password).then(function(snapshot){
                snapshot.user.display_name=name
                database.ref("/users/"+snapshot.user.uid).set({
                    user_name:snapshot.user.display_name
                })
        })

   })

//    document.getElementById("log-in").addEventListener("click",function(){
//         // var email=document.getElementById("email").textContent
//         // var password=document.getElementById("password").textContent
//         auth.signInWithEmailAndPassword(email, password)

//    })

   firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        console.log(firebaseUser)
       user.update(firebaseUser)
       console.log(user)
    } 
})

// logging out
// document.getElementById("Log-out").addEventListener("click", function () {
//     firebase.auth().signOut().then(function () {
//         document.getElementsByClassName("container")[0].style.display = "none"
//         document.getElementById("Log-out").style.display = "none"
//         document.getElementById("Log-in").style.display = "block"
//         document.getElementById("Sign-in").style.display = "block"
//     })


// })





})
