var gpio=require("pi-gpio");
var http=require("http");

var led_pin = 7;
var led_status = 0;

http.createServer( function(request, response) {
    console.log("Request received:");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Flashing LED...");

    gpio.open(led_pin, "output", function(err) {
	if(led_status == 0) { led_status = 1; }
	else { led_status = 0; }
	gpio.write(led_pin, led_status, function() {
	    gpio.close(led_pin, function() {
	        response.end();
	    });
	});
    });
}).listen(8888);

console.log("OMG this started...");

