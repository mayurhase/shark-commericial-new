function sendMessage(message) {
	$.post("message.php", { message }, function (result) {
		if (JSON.parse(result).ok) {
			alert("Message Sent Successfully!");
		} else alert(`Couldn't send the message, please try again later.`);
	});
}
