const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
});

socketapi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

// end of socket.io logic

module.exports = socketapi;