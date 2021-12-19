// Sets the webhook to send the data to
const hook = "https://dev.oscato.com/4sfwlyf";


// validate email input

// Listener, so the email is checked on entry
email.addEventListener("focusout",  emailChecker);

// Actual validation function
function emailChecker() {
    // first get the actual input
    let email = document.getElementById("email").value;
    // Check if there's any input
    if (email.length == 0) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("emailError").innerHTML = "Do not leave blank";
        return false;
    } else {

        // initialise some variables for tracking issues
        let at = 0;
        let period = false;
        let location = 0;
        let alerts = 0;
        // Check every character in the input
        for (i=0;i<email.length;i++) {
            // First check that all characters are valid
            if (email.charAt(i) == "@" || email.charAt(i) == "." || email.charAt(i) == "-" || email.charAt(i) == "_" || (/[a-zA-Z0-9]/).test(email.charAt(i)) == true) {
                // make sure it has an @, and take note of where
                if (email.charAt(i)=="@") {
                    at++;
                    if (at == 1) {
                        location = i;
                    }
                }
                // Make sure that a period appears after the @, indicating a top level domain
                if (at > 0 && i > location+1 && email.charAt(i)=="." && email.charAt(email.length-1) != ".") {
                    period = true;
                }
            } else {
                document.getElementById("email").style.borderColor = "red";
                document.getElementById("emailError").innerHTML = "Invalid e-mail address: Invalid characters";
                alerts++;
                return false;
            };
        }

        // Confirming that the address includes an @
        if (at == 0) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: No @";
            alerts++;
            return false;
        }
        // Confirming that there is a . in a valid position to indicate a domain is present
        if ( email.charAt(location+1) == "." ) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: Missing domain";
            alerts++;
            return false;
        }
        // Make sure there isn't more than 1 @
        if (at > 1 ){
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: Too many @s";
            alerts++;
            return false;
        }
        // Check that the address starts with a valid character
        if ( (email.charAt(0) == "-" || email.charAt(0) == "_" || (/[a-zA-Z0-9]/).test(email.charAt(0)) == false ) ) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: Invalid characters at start";
            alerts++;
            return false;
        }
        // Check that the address ends with a valid character
        if ( ((/[a-zA-Z0-9]/).test(email.charAt(email.length-1)) == false) ) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: Invalid characters at end";
            alerts++;
            return false;
        }
        // Alert of period placement indicates that a top level domain is not present
        if ( period == false ) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("emailError").innerHTML = "Invalid email address: Missing Top Level domain";
            alerts++;
            return false;
        } else {
            // Return true if all checks passed
            document.getElementById("email").style.borderColor = "#27ae60";
            document.getElementById("emailError").innerHTML = "";
            return true;
        }
    }
};

// validate phone number input

// Listener, so the phone is checked on entry
phone.addEventListener("change", phoneChecker);

// Actual validation function
function phoneChecker() {
    let phone = document.getElementById("phone").value;
    let nonNum = 0;
    // Check each character to make sure they're all numbers
    for (i=0;i<phone.length;i++){
        if ((/[0-9]/).test(phone.charAt(i)) == false ) {
            nonNum++;
        }
    }
    // Make appropriate return based on whether or not all characters are numbers
    if (nonNum > 0 ) {
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("phoneError").innerHTML = "Please enter only numbers";
        return false;
    } else {
        document.getElementById("phone").style.borderColor = "#27ae60";
        document.getElementById("phoneError").innerHTML = "";
        return true;
    }
}

// Check other fields for blank values
function blankChecker(fieldID) {
    let fieldValue = document.getElementById(fieldID).value;
    if (fieldValue.length == 0) {
        document.getElementById(fieldID).style.borderColor = "red";
        document.getElementById(fieldID+"Error").innerHTML = "Do not leave blank";
    } else {
        document.getElementById(fieldID).style.borderColor = "#27ae60";
        document.getElementById(fieldID+"Error").innerHTML = "";

    }
}

// Processes the form input
contactForm.addEventListener("submit", function webhookSend() {
    // Commented out preventDefault() which can be uncommented to examine the log of a form interaction without it disappearing when a form submit automatically refreshes the page
    // event.preventDefault();

    // Logging to confirm the form input started
    console.log("triggered");

    // Runs the input validitators again, in case a user ignores a popup warning
    let validPhone = phoneChecker();
    let validEmail = emailChecker();
    if ( validPhone == true && validEmail == true ) {
        // Prepare a new http request
        let request = new XMLHttpRequest();
        // Sets variables based on form input
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let number = "+" + document.getElementById("phoneCode").value + " " + document.getElementById("phone").value;
        let subject = document.getElementById("subject").value;
        let message = document.getElementById("message").value;
        // Logging to confirm variable set correctly
        console.log(number);
        // Formats the data into a JSON suitable for sending to a Slack webhook
        let jsonLoad = {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": subject,
                        "emoji": true
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "plain_text",
                            "text": "Sender: "+name,
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "e-mail: "+email,
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "Phone: "+number,
                            "emoji": true
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": message,
                        "emoji": true
                    }
                }
            ]
        };

        // Logging to inspect that the payload has been formatted correctly
        console.log(JSON.stringify(jsonLoad));

        // Creates and sends the http request
        request.addEventListener("load", reqListener);
        request.open("POST", hook, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(jsonLoad));

        // Logging to confirm these steps executed
        console.log("Sent to "+hook);
        
        // Log if there is an error
        request.onerror = function() {
            console.log("Request failed");
        };

        // If validation failed, don't refresh the page, which would remove previous inputs
    } else {
        event.preventDefault();
    }
});

// Log the response from the webhook
function reqListener () {
    console.log(this.responseText);
};