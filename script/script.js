// Manage the contact page input

// Sets the webhook to send the data to
const hook = "https://dev.oscato.com/4sfwlyf";

// Processes the form input
function webhookSend() {
    // Commented out prevent default which can be uncommented to examine the log of a form interaction without it disappearing when a form submit automatically refreshes the page
    // event.preventDefault();
    // Logging to confirm the form input started
    console.log("triggered");
    // Prepares a new http request
    let request = new XMLHttpRequest();
    // Sets variables based on form input
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    // Logging to confirm variable set correctly
    console.log(message);
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
};

// Log the response from the webhook
function reqListener () {
    console.log(this.responseText);
}