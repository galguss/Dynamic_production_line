const mongoose = require('mongoose');

const TimesDB = mongoose.Schema({
    Name_Machine: {
        require: true,
        type: String
    },
    Heating : {
        require: true,
        type: Number,
        min: 2
    },
    Light_level: {
        require: true,
        type: Number,
        min: 2
    },
    component_activation : {
        require: true,
        type: Number,
        min: 2
    },
    delay_time: {
        require: true,
        type: Number,
        min: 2
    },
    ProcessInAction : {
        require: true,
        type: Boolean
    }

});

module.exports = mongoose.model('Times', TimesDB);