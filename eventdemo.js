var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.once('onSwipe', function(){
    console.log('door is opened');
});


emitter.on('onSwipe', swipeFan);

function swipeFan() {
    console.log('fan is on');
    emitter.removeListener('onSwipe', swipeFan);
}

emitter.on('onSwipe', function(){
    console.log('ac is on');
});


emitter.emit('onSwipe');
emitter.emit('onSwipe');

