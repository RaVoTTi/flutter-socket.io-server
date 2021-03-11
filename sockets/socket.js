const { io } = require('../index.js');
const Bands = require('../models/bands.js');
const Band = require('../models/band.js');

const bands = new Bands();

bands.addBand(new Band('Pink Floyd'));
bands.addBand(new Band('KISS'));
bands.addBand(new Band('Rollings Stones'));
bands.addBand(new Band('Soda Stereo'));

// console.log(bands);

io.on('connection', client => { // comunicacion del socket
  console.log('Cliente conectado');

  client.emit('active-bands', bands.getBands());
  // client.on es para escuchar algo
  client.on('disconnect', () => console.log('Cliente desconectado'));

  client.on('mensaje', (payload) => {
    console.log(payload); // ('Mensaje!!' + payload) == [obaject, object]
    io.emit('mensaje', { admin: 'Mensaje nuevo' }); // emit = publicar
  });

  client.on('emitir-mensaje', (payload) => {

    // el io.emit envia el mensaje a todos los clientes
    io.emit('emitir-mensaje', payload);
    
    // el client.broadcast.emit envia el mensaje a todos los clientes menos al que lo envia
    // client.broadcast.emit('emitir-mensaje', payload);
    console.log(payload['name'] + ':', payload['message']);

  });
  client.on('Mensaje Flutter', (payload) => {
    client.broadcast.emit('Mensaje Flutter', payload);
    console.log(payload['name'] + ':' ,payload['message']);

  });
});