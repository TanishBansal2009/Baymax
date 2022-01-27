var transcript = "";
var recognition = new webkitSpeechRecognition();
var startup = /.*?(ma(cs|x)|jarvis|siri)/i
var listenForStopPlay = /stop|play/i
setUpRecognition = function() {
	recognition.onstart = function(event) {
		console.log("recognition started");
	}
	recognition.onresult = function(event) {
		transcript = event.results[event.results.length-1][0].transcript
		isSleeping = isSleeping ? !startup.test(transcript) : false 
		console.log(transcript);
		if (transcript && !isSleeping) {
			if (isPlayingMusic) {
				if (listenForStopPlay.test(transcript)) {
					sendRequest(transcript.replace(/.*?(stop|play)(.*?)/, "$1$2").trim());
				}
			} else {
				BEEP.Baymax.play();
				sendRequest(transcript.trim())
			}
		}
	}
	recognition.onsoundend = function(event) { 
		console.log("sound has ended");
	}
	recognition.onend = function(event) {
		setTimeout(function() {
			if (https && !isSpeaking) {
				try {event.target.start()} catch(e) {console.log(e)}
			}
		}, 750);
	}
	recognition.start();
}