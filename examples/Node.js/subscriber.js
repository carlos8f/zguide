var zmq = require('zmq')
var subscriber = zmq.socket('sub')

var got = 0;

setInterval(function() {
  console.log(got + "/sec")
  got = 0;
}, 1000)

subscriber.on("message", function(time) {
  //console.log(new Date().getTime() - time)
  got++;
})

subscriber.connect("tcp://localhost:8688")
subscriber.subscribe("")

process.on('SIGINT', function() {
  subscriber.close()
  console.log('\nClosed')
})
