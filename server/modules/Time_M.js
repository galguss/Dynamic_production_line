const mongoose = require('mongoose');

const TimesDB = mongoose.Schema({
    Name_Machine: {
        require: true,
        type: String
    },
    Heating : {
        require: true,
        type: Number,
    },
    Light_level: {
        require: true,
        type: Number,
    },
    component_activation : {
        require: true,
        type: Number,
    },
    delay_time: {
        require: true,
        type: Number,
    },
    ProcessInAction : {
        require: true,
        type: Boolean
    }

});

module.exports = mongoose.model('Times', TimesDB);