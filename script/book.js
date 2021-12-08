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

var humptyPath = 0;
var jackJillPath = 0;
var missMuffetPath = 0;

function start(story) {
	document.getElementById(story+"-title").style.display = "none";
	document.getElementById(story+"line"+0).style.visibility = "visible";
	document.getElementById(story+"-box").style.visibility = "visible";
}

function go(story) {
	console.log("Humpty: "+humptyPath);
	console.log("JackJill: "+jackJillPath);
	console.log("missMuffet: "+missMuffetPath);
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
	if ( (story == "jackJill" && jackJillPath > 2 && jackJillPath < 6) || (story == "missMuffet" && missMuffetPath > 2 && missMuffetPath < 5) ) {
		var stage = "<div class=\"col-12\"><div id=\""+split+"\"><img class=\"story-element\" src=\"../images/"+img2+".png\" onclick=\"go('"+story+"')\"></div><div id="+story+(eval(story+"Path")+1)+"><img class=\"story-element\" src=\"../images/"+img+".png\" onclick=\"go('"+story+"')\"></div></div>"
	} else {
		var stage = "<div class=\"col-12\" id="+story+(eval(story+"Path")+1)+"><img class=\"story-element\" src=\"../images/"+img+".png\" onclick=\"go('"+story+"')\"></div>";
	}
	document.getElementById(story+"-box").innerHTML = stage;
	if (eval(story+"Path")<lines) {
		document.getElementById(story+"line"+eval(story+"Path")).style.visibility = "visible";
	} else {
		for (i=0;i<eval(story+"Path");i++) {
			document.getElementById(story+"line"+i).style.visibility = "hidden";
		}
		document.getElementById(story+"-box").style.visibility = "hidden";
		document.getElementById(story+"-title").style.display = "flex";
		if (story == "humpty") {
			humptyPath = 0;
		} else if (story == "jackJill") {
			jackJillPath = 0;
		} else if (story == "missMuffet") {
			missMuffetPath = 0;
		}
	}
	if (story == "missMuffet" && missMuffetPath == 5) {
		document.getElementById("missMuffet-box2").style.visibility = "visible";
	} else if (story == "missMuffet" && missMuffetPath != 5) {
		document.getElementById("missMuffet-box2").style.visibility = "hidden";
	}
}