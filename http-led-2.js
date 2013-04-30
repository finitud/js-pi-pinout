var express = require('express');
var app = express();

var gpio = require('pi-gpio');
var led_pin = 7;
var led_prev_stat = 0;
var led_status = 0;

function switchLED(pin, stat, callback) {
    led_prev_stat = led_status;
    gpio.open(pin, "output", function(err) {
	led_status = stat;
	gpio.write(pin, led_status, function() {
	    gpio.close(pin, callback());
	});
    });
}

function logSwitch(res) {
    on_off = led_status == 0 ? "off" : "on";
    res.write('LED ' + on_off);
    res.end();

    if(led_status != led_prev_stat) {
	console.log('LED turned ' + on_off + ' by request');
    } else {
	console.log('LED still ' + on_off);
    }
}

app.get('/on', function(req, res) {
    switchLED(led_pin, 1, function() { logSwitch(res) });
});

app.get('/off', function(req, res) {
    switchLED(led_pin, 0, function() { logSwitch(res) });
});

var port = 8888
app.listen(port);
console.log("Listening on port " + port);
