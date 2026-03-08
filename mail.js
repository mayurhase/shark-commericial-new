function sendMail(mail) {
	$.post("mail.php", { mail }, function (result) {
		if (result == "true") {
			alert("Message Sent Successfully!");
		} else alert(`Couldn't send the message, please try again later.`);
	});
}
