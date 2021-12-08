const hook = "https://hookncirl.free.beeceptor.com";

function webhookSend() {
    console.log("triggered");
    let request = new XMLHttpRequest();
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    console.log(message);
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

    console.log(JSON.stringify(jsonLoad));
    // Ajax JQuery approach
    // $.post(hook,jsonLoad, function(data,status){
    //     console.log(data+" and status is "+status);
    // })

    // XMLHttpRequest() approach

    // request.addEventListener("load", reqListener);
    // request.open("POST", hook, true);
    // request.setRequestHeader("Content-type", "application/json");
    // request.send(JSON.stringify(jsonLoad));
    // console.log("Sent to "+hook);

//     request.onprogress = function(event) {
//         if (event.lengthComputable) {
//            alert(`Received ${event.loaded} of ${event.total} bytes`);
//         } else {
//            alert(`Received ${event.loaded} bytes`); // no Content-Length
//         }
     
//      };
     
//      request.onerror = function() {
//         alert("Request failed");
//      };
// };
// function reqListener () {
//     console.log(this.responseText);

// Axios approach

axios({
    method: 'post',
    url: hook,
    data: jsonLoad
})
.then(data=>console.log(data))
.catch(err=>console.log(err))
}