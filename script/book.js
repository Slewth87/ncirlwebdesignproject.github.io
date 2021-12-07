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


// Humpty Dumpty interactions

var humptyPath = 0;
const humptyBox1 = "<div class='col-12'><img class='story-element' id='humpty2' src='../images/fall.png' onclick='humptyGo()'></div>";
const humptyBox2 = "<div class='col-12'><img class='story-element' id='humpty3' src='../images/down.png' onclick='humptyGo()'></div>";
const humptyBox3 = "<div class='col-12'><img class='story-element' id='humpty4' src='../images/men.png' onclick='humptyGo()'></div>";
const humptyBox4 = "<div class='col-12'><img class='story-element' id='humpty4' src='../images/hend.png' onclick='humptyGo()''></div>";
const humptyBox5 = "<div class='col-12'><img class='story-element' id='humpty1' src='../images/humpty.png' onclick='humptyGo()'></div>";

function humptyStart() {
	document.getElementById("humpty-title").style.display = "none";
	document.getElementById("hline").style.visibility = "visible";
	document.getElementById("humpty-box").style.visibility = "visible";
}

function humptyGo() {
	if (humptyPath<4) {
		humptyPath++;
		document.getElementById("hline"+humptyPath).style.visibility = "visible";
		document.getElementById("humpty-box").innerHTML = eval("humptyBox"+humptyPath);
	} else {
		document.getElementById("hline").style.visibility = "hidden";
		for (i=1;i<=humptyPath;i++) {
			document.getElementById("hline"+i).style.visibility = "hidden";
		}
		document.getElementById("humpty-box").innerHTML = humptyBox5;
		document.getElementById("humpty-box").style.visibility = "hidden";
		document.getElementById("humpty-title").style.display = "block";
		humptyPath = 0;
	}
}