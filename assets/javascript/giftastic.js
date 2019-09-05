// Topics variable
var shows = ["Daredevil", "Breaking Bad", "The Office", "Game of Thrones", "Fresh Prince of Bel-Air", "Stranger Things", "Parks and Recreation"];   
function renderButtons() {
// Deleting the gifs prior to adding new gifs
$("#buttons-view").empty();
// Looping through the array of shows
for (var i = 0; i < shows.length; i++) {
// Then dynamicaly generating buttons for each show in the array
var a = $("<button>");
// Adding a class of show to our button
a.addClass("show");
// Adding a data-attribute
a.attr("data-name", shows[i]);
// Providing the initial button text
a.text(shows[i]);
// Adding the button to the buttons-view div
$("#buttons-view").append(a);
}
}

//get input from user. 
$('#add-gif').on('click', function(event){
event.preventDefault();
userInput = $('#gif-input').val().trim();
console.log(userInput);
shows.push(userInput);
console.log(shows);
renderButtons();
})
$(document).on('click', ".show", function(){
 var x = $(this).data("name");
 console.log(x);

// Constructing a queryURL using the show name
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +x+
	"&api_key=kqiKKvJG2sEYdrlq3DGOTos6nyNHFnNG&limit=10";
	
// Performing an AJAX request with the queryURL
	$.ajax({
	 url: queryURL,method: "GET"})
// After data comes back from the request
	.done(function(response) {
	 console.log(queryURL);
	 console.log(response);

 
// Looping through each item
for(var i=0; i<response.data.length;i++){
// Creating and storing a div tag
	 var showDiv = $("<div>");
// Creating a paragraph tag with the rating
	 var p = $("<p>").text("Rating: " + response.data[i].rating);  

// Creating an image tag
	 var showImage = $("<img>");
	 showImage.attr('src',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
			showImage.attr('data-still',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
			showImage.attr('data-animate',response.data[i].images.fixed_height.url.replace(/^http:\/\//i, 'https://'));
			showImage.attr('data-state',"still");
			  showImage.addClass("gif");
			   showDiv.append(p);
	 showDiv.append(showImage);

// Prepending the topicDiv to the HTML page in the "#gifs-appear-here" div      
	 $("#gifs-appear-here").prepend(showDiv);

//here is our on click function to start and stop the gifs once loaded onto the page
		 
	 } //end of the for loop
	 $(document).on("click", "img", function() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
//if/else statements
if (state === "still") {
$(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
} else {
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-state", "still");
}
})
 })
}) 	
renderButtons();