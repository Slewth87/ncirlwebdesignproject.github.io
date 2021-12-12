// Set features of the Flipbook

function loadApp() {

	var flipbook = $('.flipbook');

 	// Check if the CSS was already loaded
	
	if (flipbook.width()==0 || flipbook.height()==0) {
		setTimeout(loadApp, 10);
		return;
	}

	// Create the flipbook

	$('.flipbook').turn({
			// Elevation

			elevation: 50,
			
			// Enable gradients

			gradients: true,
			
			// Auto center this flipbook

			autoCenter: true

	});
}


// Story interactions


// Set story variables for finding which path through the function to use, depending on which story is being interacted with.
var humptyPath = 0;
var jackJillPath = 0;
var missMuffetPath = 0;

// First function, to start the story cycle for a story
function start(story) {
	document.getElementById(story+"-title").style.display = "none";
	document.getElementById(story+"line"+0).style.visibility = "visible";
	document.getElementById(story+"-box").style.visibility = "visible";
}

// Progress through a story
function go(story) {
	// Logging to check that the right path is progressing as a story is interacted with
	console.log("Humpty: "+humptyPath);
	console.log("JackJill: "+jackJillPath);
	console.log("missMuffet: "+missMuffetPath);

	// Checking which story is being interacted with, and then what phase of the story in order to select the correct img to set
	if (story == "humpty") {
		var lines = 5;
		humptyPath++;
		if (humptyPath == 1) {
			var img = "fall";
		};
		if (humptyPath == 2) {
			var img = "down";
		};
		if (humptyPath == 3) {
			var img = "men";
		};
		if (humptyPath == 4) {
			var img = "hend";
		};
		if (humptyPath == 5) {
			var img = "humpty";
		};
	};
	if (story == "jackJill") {
		var lines = 6;
		jackJillPath++;
		if (jackJillPath < 3 || jackJillPath > 6) {
			var img = "jackJill";
		};
		if (jackJillPath > 2 && jackJillPath < 5) {
			var img = "jackfall";
			var img2 = "jill";
			var split = "jillian";
		};
		if (jackJillPath == 5) {
			var img = "jackfall";
			var img2 = "jillfall";
			var split = "jillian";
		};
		if (jackJillPath == 6) {
			var img = "jackJill";
		};
	};
	if (story == "missMuffet") {
		var lines = 6;
		missMuffetPath++;
		if (missMuffetPath == 1) {
			var img = "muffetSat";
		};
		if (missMuffetPath > 1 && missMuffetPath < 5) {
			var img = "muffetEat";
		};
		if (missMuffetPath > 2) {
			var img2 = "spider";
			var split = "spider"+missMuffetPath;
		};
		if (missMuffetPath == 5) {
			var img = "spider";
		};
		if (missMuffetPath == 6) {
			var img = "missMuffet";
		};
	};

	// Checking if it's a story and story stage that requires two images to be used in the page. And setting the appropriate images html data for the stage
	if ( (story == "jackJill" && jackJillPath > 2 && jackJillPath < 6) || (story == "missMuffet" && missMuffetPath > 2 && missMuffetPath < 5) ) {
		var stage = "<div class=\"col-12\"><div id=\""+split+"\"><img class=\"story-element\" src=\"../images/"+img2+".png\" onclick=\"go('"+story+"')\"></div><div id="+story+(eval(story+"Path")+1)+"><img class=\"story-element\" src=\"../images/"+img+".png\" onclick=\"go('"+story+"')\"></div></div>"
	} else {
		var stage = "<div class=\"col-12\" id="+story+(eval(story+"Path")+1)+"><img class=\"story-element\" src=\"../images/"+img+".png\" onclick=\"go('"+story+"')\"></div>";
	}
	// Sets the image html to the page
	document.getElementById(story+"-box").innerHTML = stage;

	// Displays the next line in the story
	if (eval(story+"Path")<lines) {
		document.getElementById(story+"line"+eval(story+"Path")).style.visibility = "visible";
	// Clears all the lines and resets the images if the story is complete
	} else {
		for (i=0;i<eval(story+"Path");i++) {
			document.getElementById(story+"line"+i).style.visibility = "hidden";
		}
		document.getElementById(story+"-box").style.visibility = "hidden";
		document.getElementById(story+"-title").style.display = "flex";
		// Resets the variables at the end of the story
		if (story == "humpty") {
			humptyPath = 0;
		} else if (story == "jackJill") {
			jackJillPath = 0;
		} else if (story == "missMuffet") {
			missMuffetPath = 0;
		}
	}
	// Manages the visibility of the image for the Miss Muffet story, as that has a separate image box on the second page.
	if (story == "missMuffet" && missMuffetPath == 5) {
		document.getElementById("missMuffet-box2").style.visibility = "visible";
	} else if (story == "missMuffet" && missMuffetPath != 5) {
		document.getElementById("missMuffet-box2").style.visibility = "hidden";
	}
}