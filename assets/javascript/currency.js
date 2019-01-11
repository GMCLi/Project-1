$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAm2DX2UmnZ1-IG1fWL4lFJWPvx2eXV5PU",
        authDomain: "rps-game-ce388.firebaseapp.com",
        databaseURL: "https://rps-game-ce388.firebaseio.com",
        projectId: "rps-game-ce388",
        storageBucket: "rps-game-ce388.appspot.com",
        messagingSenderId: "138684371598"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    // creates the dropdown list for the diffrent currencies the first one is for the base and the second on is for what we want

    database.ref("/currency/list/results").on("child_added", function (snapshot) {


        var option = document.createElement("option")
        option.setAttribute("value", snapshot.val().id)
        option.setAttribute("class", "list")
        option.textContent = snapshot.val().currencyName
        document.getElementById("currency").append(option)

    })

    function Ajax_call(from, to,callback) {
        var q = from + "_" + to
        console.log(q)
        var queryUrl = "https://free.currencyconverterapi.com/api/v6/convert?q=" + q

        console.log(queryUrl)
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {

            console.log(response)
            console.log(q)
            var rate = response.results[q].val
            callback(rate)
        })
    }

    function Converstion() {

        var task = this.getAttribute("id")
        switch (task) {
            case "convert":

                var from = document.getElementById("from").value
                var to = document.getElementById("to").value
             
                 Ajax_call(from, to, function(rate){
                    console.log(rate)
                    var amount = parseFloat(document.getElementById("amount").value)
                    console.log(amount)
                    var converstion = (rate * amount).toFixed(2)

                    document.getElementById("converted-amount").textContent = converstion
                })

                break;
            case "new_default":
            var task = this.getAttribute("id")
            var from = document.getElementById("eventDisplay").getAttribute("data-currency")
            var to = document.getElementById("new_default").value
            document.getElementById("eventDisplay").setAttribute("data-currency",to)
            Ajax_call(from, to, function(rate,to){
                var list = document.getElementsByClassName("price-range")
                for (var i = 0; i < list.length; i++) {
                    var price = {
                        max: parseFloat(list[i].getAttribute("data-max")),
                        min: parseFloat(list[i].getAttribute("data-min")),
                    }
                    price.max = (price.max * rate).toFixed(2)
                    price.min = (price.min * rate).toFixed(2)
                    list[i].setAttribute("data-min",price.min)
                    list[i].setAttribute("data-min", price.max)
                    list[i].textContent = "Price range: " + price.min + " to " + price.max + " " +  document.getElementById("eventDisplay").getAttribute("data-currency")
                }
            })   


         

               
        }
    }
    document.getElementById("change_default").addEventListener("click", Converstion)
    //need a button to do these
    // document.getElementById("convert").addEventListener("click", Converstion)
    document.getElementById("new_default").addEventListener("input",myfunction)

    function myfunction(){
        console.log(this.value)
    }
    $('.flexdatalist').flexdatalist({
        minLength: 1,
        valueProperty: "value"
    });



})