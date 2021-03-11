const Band = require("./band");

class Bands { 
    
    // aca se puede reeemplazar por las respectivas 
    // acciones a la base de datos

    constructor() {
        this.bands = []; // bands es la lista
    }

    addBand(band = new Band()) {
        this.bands.push(band);

    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = '') {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteBand (id = ''){

        this.bands = this.bands.map(band => {
            if (band.id === id){
                band.votes++;
                return band;
            }
            else {
                return band;
            }
        });
    }


}

module.exports = Bands;