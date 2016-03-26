$(document).ready(function() {
    var socket = io('http://localhost:8080');
    var regex = /(<([^>]+)>)/ig
    // FIXME:The regex takes away all less than signs and anything after than
    $('input#message').keyup(function(event) {
        var nickname = $('input#nickname').val().replace(regex, "");
        var message = $('input#message').val().replace(regex, "");
        if (event.keyCode == 13 && nickname.length > 0) {
            console.log(nickname+": "+message);
            socket.emit("message", nickname, message);
            $('div#pastMessages').append("<br>" + nickname + ": " + message);
            $('input#message').val("");
        }
    });
    socket.on('message', function(nickname, message) {
        $('div#pastMessages').append("<br>" + nickname.replace(regex, "") +
         ": " + message.replace(regex, ""));
    });
});
