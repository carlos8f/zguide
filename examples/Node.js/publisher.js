var zmq = require('zmq')
var publisher = zmq.socket('pub')

publisher.bind('tcp://*:8688', function(err) {
  if(err)
    console.log(err)
  else {
    console.log("Listening on 8688...")
  }
})

/*
var x = 100;
setTimeout(function() {
  setInterval(function() {
    for(var i = 0; i < x; i++) {
        var time = new Date().getTime();
        publisher.send(time);
    }
    console.log('sent ' + x + ' messages')
    //x = x * 2;
  }, 50);
}, 1000)
*/

var sent = 0;
setInterval(function() {
  console.log(sent + "/sec");
  sent = 0;
}, 1000)

function doTheThing() {
  //var time = new Date().getTime();
  publisher.send(1);
  publisher.send(1);
  sent += 2;
  process.nextTick(doTheThing);
}

setTimeout(function() {
  doTheThing();
}, 1000)

process.on('SIGINT', function() {
  publisher.close()
  console.log('\nClosed')
})
