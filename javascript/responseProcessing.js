function write(response){
	if(response.error){
		writeError(response.error);
		return false;
	}else if(response.message){
		writeMessage(response.message);
	}
	return true;
}

function process(response){
	return write(response);
}

function writeError(text, delay){
	delay = delay || 6000 + text.length * 5;
	$("#messages").html(text).css('color','red').slideDown("slow").delay(delay).slideUp("slow");
}
function writeMessage(text, delay){
	delay = delay || 6000;
	$("#messages").html(text).css('color','green').slideDown("slow").delay(delay).slideUp("slow");
}
