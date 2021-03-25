const { io } = require('../index.js');
const Bands = require('../models/bands.js');
const Band = require('../models/band.js');

const bands = new Bands();

bands.addBand(new Band('Pink Floyd'));
bands.addBand(new Band('KISS'));
bands.addBand(new Band('Rollings Stones'));
bands.addBand(new Band('Soda Stereo'));

console.log(bands);


// SE CONECTA UN CLIENTE
io.on('connection', client => { // comunicacion del socket
  console.log('Cliente conectado');

  // client.emit es para emitir algo
  client.emit('active-bands', bands.getBands());

  // client.on es para escuchar algo
  client.on('disconnect', () => console.log('Cliente desconectado'));

  // mensaje desde el navegador
  client.on('mensaje-navegador', (payload) => {
    console.log(payload); // ('Mensaje!!' + payload) == [obaject, object]
    io.emit('mensaje-navegador', { admin: 'Mensaje nuevo' });
  });

  client.on('vote-band', (band) => {
    bands.voteBand(band.id);
    io.emit('active-bands', bands.getBands());
  });

  // client.on('emitir-mensaje', (payload) => {
  //   // el io.emit envia el mensaje a todos los clientes
  //   io.emit('emitir-mensaje', payload);
  //   // el client.broadcast.emit envia el mensaje a todos los clientes menos al que lo envia
  //   // client.broadcast.emit('emitir-mensaje', payload);
  //   console.log(payload['name'] + ':', payload['message']);
  // });
  client.on('create-band', (band) => {
    console.log(band.name);
    bands.addBand(new Band(band.name)); // recordar que el argumento que recibe el addBand 
                                        // no es el nombre si no una banda
    io.emit('active-bands', bands.getBands());
    
  });

  client.on('delete-band', (band) => {
    bands.deleteBand(band.id);
    // console.log(band.id);
    io.emit('active-bands', bands.getBands());
  })



  client.on('mensaje-flutter', (payload) => {
    client.broadcast.emit('mensaje-flutter', payload);
    console.log(payload['name'] + ':', payload['message']);

  });
});