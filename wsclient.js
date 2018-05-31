var serverURL = "ws://192.168.1.8:7000"; // URL
var pollingInterval = 1000; // ms
var lastConnectionState = WebSocket.CLOSED;

function Encode(message) {
	var buffer = new ArrayBuffer(message.length + 2);
	var uint8 = new Uint8Array(buffer);
	uint8[0] = 0;
	uint8[1] = message.length;
	for (var i = 0; i < message.length; i++) {
		uint8[i + 2] = message.charCodeAt(i);
	}
	return buffer;
}

function Decode(data) {
	var result = [];
	var total = data.length;
	var index = 0;
	var channel = data[index++];
	while (index < total) {
		var size = data[index++];
		var value = data.slice(index, index + size);
		result.push(String.fromCharCode.apply(null, value));
		index += size;
	}
	return result;
}

function KeepAlive(ws) {
	if (ws.readyState == WebSocket.OPEN) {
		ws.send(255);
		setTimeout(function() {
			KeepAlive(ws);
		}, pollingInterval);
	}
}

function Connect(addr) {
	if (lastConnectionState == WebSocket.CLOSED) {
		console.log("Live-link connecting...");
		lastConnectionState = WebSocket.CONNECTING;
	}
	var ws = new WebSocket(addr, ['unitygame']);
	ws.binaryType = "arraybuffer";

	// On connected event
	ws.onopen = function () {
		if (lastConnectionState != WebSocket.OPEN) {
			console.log("Live-link connected.");
			lastConnectionState = WebSocket.OPEN;
		}

		// On data received event
		ws.onmessage = function (message) {
			var data = new Uint8Array(message.data);
			if (data.length == 1 && data[0] == 255) {
				// Ping from Unity, just drop message
			} else {
				var args = Decode(data);
				if (args.length == 0)
					return;
				var command = args[0];
				if (command === "reload") {
					if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || window.location.protocol === 'file:') {
						location.href = args[1];
					} else {
						location.reload(true);
					}
				} else {
					console.error("Live-link received unknown command: '" + args.join(' ') + "'");
				}
			}
		}

		// Start keep-alive ping to prevent connection timeout
		KeepAlive(ws);
	}

	// On connection closed event
	ws.onclose = function () {
		if (lastConnectionState == WebSocket.OPEN) {
			console.log("Live-link connection closed.");
			lastConnectionState = WebSocket.CLOSED;
		}
		setTimeout(function () {
			Connect(serverURL);
		}, pollingInterval);
	}
};

Connect(serverURL);
