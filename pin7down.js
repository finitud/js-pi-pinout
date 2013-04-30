var pi = require("pi-gpio");

pi.open(7, "output", function(err) {
    pi.write(7, 0, function() { pi.close(7); });
});
