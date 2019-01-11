$(document).ready(function(){
//     var config = {
//         apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
//         authDomain: "rps-game-ce388.firebaseapp.com",
//         databaseURL: "https://rps-game-ce388.firebaseio.com",
//         projectId: "rps-game-ce388",
//         storageBucket: "rps-game-ce388.appspot.com",
//         messagingSenderId: "138684371598"
//       };
//       firebase.initializeApp(config);

//    var database=firebase.database();
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


// clicking a button to sign-in or create user
    document.getElementById("sign-in").addEventListener("click",Auth_modal)
    document.getElementById("create_user").addEventListener("click",Auth_modal)

var task_button=document.getElementById("task_button")
//openingthe modal
function Auth_modal(){

    var task=this.getAttribute("id")
   
    var name_box=document.getElementById("name_box")
    name_box.innerHTML=""
    task_button.setAttribute("data-task",task)
    task_button.textContent=task
 if(task==="create_user"){
        var name_input=document.createElement("input")
        name_input.setAttribute("type", "text")
        name_input.setAttribute("id", "Username")
        name_input.setAttribute("class", "form-control")
        name_input.setAttribute("aria-label", "Sizing example input")
        name_input.setAttribute("aria-describedby", "inputGroup-sizing-sm")
        name_input.setAttribute("placeholder", "Username")

        name_box.appendChild(name_input)
    }
}


//auth button
    task_button.addEventListener("click",function(){
        var task=this.getAttribute("data-task")
      
        var email=document.getElementById("email").value
        var password=document.getElementById("password").value
        switch(task){

            case "create_user":
            var name=document.getElementById("Username").textContent
            auth.createUserWithEmailAndPassword(email, password).then(function(snapshot){
                snapshot.user.display_name=name
                database.ref("/users/"+snapshot.user.uid).set({
                    user_name:snapshot.user.display_name
                })
             })
           
            break;
            case "sign-in":
            auth.signInWithEmailAndPassword(email, password)
    
        }
    })

    //when they log in or create a user
   firebase.auth().onAuthStateChanged(firebaseUser => {

    if (firebaseUser) {
        console.log(firebaseUser)
       user.update(firebaseUser)
       console.log(user)
    } 
})

// logging out
document.getElementById("Log-out").addEventListener("click", function () {
    firebase.auth().signOut().then(function () {
        console.log("bye")
    })


})

//favorites
document.getElementById("eventDisplay").addEventListener("click",function(){

})


})




