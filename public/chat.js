$(function() {
    var socket = io.connect('http://localhost:3000');

    var message = $('#message');
    var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    
    send_message.click(function() {
        socket.emit('new_message', { message: message.val() });
    });
});