
const {v4: uuidV4 } = require('uuid');

class Band {
    
    // el constructor solo requiere el nombnre de la banda
    constructor( name = 'no-name'){ 

        this.id = uuidV4(); // iden unico
        this.name = name;
        this.votes= 0;
    }

}

module.exports = Band; 