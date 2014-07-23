var apxp=express();
var messages = [];//array of messages
var port = /*prompt("Enter port number")*/15392;

var socket = io.connect("http://server27614.herokuapp.com:"+port);
var name="temporary";

var content = document.getElementById("content");
var msg = document.getElementById("msg");
var sendButton = document.getElementById("send");

socket.on('message', function (data) {
    if(data.message) {
        messages.push(data);//push the new message into the array
        var html='';
        if(messages.length==1)//the welcome message is the first message
            messages[0].message+=" <b>"+name+"</b>";//this prints the username in bold 
        for(var i=0; i<messages.length; i++) {
            if(messages[i].sender==name)//if the message has been sent by the local client
                html+='<div style="float:right;">';
            html += '<b>' + messages[i].sender + ': </b>';//puts the sender's name in bold before the message
            html += messages[i].message;
            if(messages[i].sender==name)
                html+='</div>';//closing the div that was opened above
            html+="<br>";
        }
        content.innerHTML = html;
    } else {
        console.log("There is a problem:", data);
    }
});

sendButton.onclick = function() {
    // if(name == "") {
    //     alert("Please type your username");
    // } else {
    var text = msg.value;
    msg.value=""
    socket.emit('send', { message: text, sender: name });
   // }
};