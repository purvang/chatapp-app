window.onload = function() {
    alert("name");
    var messages = [];
    var port= 5000;
    var socket = io.connect('http://chatapp27614.herokuapp.com/');//connect to chatapp27614.herokuapp.com
    var name="temporary";
    
    var content = document.getElementById("content");
    var msg = document.getElementById("msg");
    var sendButton = document.getElementById("send");
    
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html='';
            if(messages.length==1)
                messages[0].message+=" <b>"+name+"</b>";
            for(var i=0; i<messages.length; i++) {
                if(messages[i].sender==name)
                    html+='<div style="float:right;">';
                html += '<b>' + messages[i].sender + ': </b>';
                html += messages[i].message;
                if(messages[i].sender==name)
                    html+='</div>';
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
 
}