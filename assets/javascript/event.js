
var eventResults;
var eventName;
var eventCurrency;
var EventMinPrice;
var eventMaxPrice;
var eventDate;
var eventTime;
var eventImage;
var eventVenue;
var eventURL;
var eventCountry;
var eventState;
var eventCity;
var searchURL;

$(document).ready(function(){

    //Generate dynamic URL

    //firebase config
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

    //grab fb data
    database.ref("/countries/country_list").orderByChild("name").equalTo("canada").on("value", function(snapshot) {
        
        snapshot.forEach(function(data) {
            console.log(data);
        });
    });
   /* database.ref("/countries/country_list").on("child_added",function(snapshot){
       

        

        
          

        //I want to get country that the user entered (eventCountry) and find it in snapshot

        var option= document.createElement("option")
        option.setAttribute("value",snapshot.val().id)
        option.setAttribute("class", "list")
        option.textContent=snapshot.val().currencyName
        document.getElementById("currency").append(option)
        
        //match the country with the countrycode and save countrycode (eventCode)
 
    
       }); */
      
    // searchURL = "//https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp&city=" + eventCity + "&" + countryCode ""=&stateCode="

$("#eventSearch").on("click", function(){

    event.preventDefault();
   
   console.log("you clicked me!");
    //capture search values

    eventCountry = $("#event-country").val().trim().toLowerCase();
    console.log(eventCountry);

    eventState = $("#event-state").val().trim().toLowerCase();
    console.log(eventState);

    eventCity = $("#event-city").val().trim().toLowerCase();
    console.log(eventCity);

    

    //Ticketmaster API
    $.ajax({
        type:"GET",

        //url:searchURL;
        //url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=GRovhZWESxeRpkyVqNiWvG5iDGeyFBTp",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json._embedded.events);
                    // Parse the response.
                    // Do other things.
        // store the data from the AJAX request in the results variable
                    eventResults = json._embedded.events;

                    for(var i=0; i<eventResults.length; i++){

                        if(Array.isArray(eventResults[i].priceRanges)){
                          
                        console.log("Event number is: " +i);
                        console.log("Event name is :" + eventResults[i].name);//1
                        console.log("Event image :" + eventResults[i].images[3].url);//2
                        console.log("Event Currency  :" + eventResults[i].priceRanges[0].currency);//3
                        console.log("Event Min Price :" + eventResults[i].priceRanges[0].min);//4
                        console.log("Event Max Price :" + eventResults[i].priceRanges[0].max);//5
                        console.log("Event Local Date :" + eventResults[i].dates.start.localDate);//6
                        console.log("Event Local Time :" + eventResults[i].dates.start.localTime);//7
                        console.log("Event Venue - City :" + eventResults[i]._embedded.venues[0].city.name);//8
                        console.log("Event Venue - Country:" + eventResults[i]._embedded.venues[0].country.name);//9
                        console.log("Buy Tickets " + eventResults[i].url);

                        //assign event variables based on data
                        eventName = eventResults[i].name;
                        eventImage = eventResults[i].images[0].url;
                        eventCurrency = eventResults[i].priceRanges[0].currency;
                        EventMinPrice = eventResults[i].priceRanges[0].min;
                        eventMaxPrice = eventResults[i].priceRanges[0].max;
                        eventDate = eventResults[i].dates.start.localDate;
                        eventTime = eventResults[i].dates.start.localTime ;
                        eventVenue = eventResults[i]._embedded.venues[0].city.name + " , " + eventResults[i]._embedded.venues[0].country.name;
                        eventURL = eventResults[i].url;
                        }

                        //display results on page.

                        var newEvent = $("<div>");
                        newEvent.addClass("card float-sm-left float-md-left float-lg-left");
                        newEvent.css("width", "18rem");

                        var newEventImage = $("<img>");
                        newEventImage.attr("src", eventResults[i].images[0].url);
                        newEventImage.addClass("card-img-top");

                        var newEventcardbody = $("<div>");
                        newEventcardbody.addClass("card-body");
                        newEventcardbody.attr("data-min", EventMinPrice);
                        newEventcardbody.attr("data-max", eventMaxPrice);

                        
                        var neweventTitle = $("<h5>");
                        neweventTitle.addClass("card-title");
                        neweventTitle.text(eventResults[i].name);

                        var neweventDetails = $("<p>");
                        neweventDetails.addClass("card-text");
                        neweventDetails.text(eventVenue);

                        var newEventPrice = $("<p>");
                        newEventPrice.addClass("card-text");
                        newEventPrice.text("Price range: " + EventMinPrice + " to " + eventMaxPrice + " " + eventCurrency);

                        var newEventDate
                        newEventDate = $("<p>");
                        newEventDate.addClass("card-body");
                        newEventDate.text(eventDate + " , " + eventTime);
    

                        var buyTickets = $("<a>");
                        buyTickets.addClass("btn btn-primary");
                        buyTickets.attr("href", eventResults[i].url);
                        buyTickets.text("Buy Tickets");

                        //append event details to card body    
                        
                        newEventcardbody.append(newEventPrice);
                        newEventcardbody.append(newEventDate);
                        newEventcardbody.append(neweventDetails);
                        newEventcardbody.append(buyTickets);

                        //append image and card body to card
                        newEvent.append(neweventTitle);
                        newEvent.append(newEventImage);
                        newEvent.append(newEventcardbody);
                        

                        //append card to html

                        $("#eventDisplay").append(newEvent);

                        //clear float

                        var clearFloat = $("<div>");
                        clearFloat.addClass("clearfix");

                        // <div class="card" style="width: 18rem;">
                        //     <img src="..." class="card-img-top" alt="...">
                        // <div class="card-body">
                        //     <h5 class="card-title">Card title</h5>
                        //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        //     <a href="#" class="btn btn-primary">Go somewhere</a>
                        //     </div>
                        // </div>
                    }

                    $("#eventDisplay").attr("data-currency", eventCurrency);



                    

                 },
        error: function(xhr, status, err) {
                    // This time, we do not end up here!
                 }

                    
    

      });

      

});
});
