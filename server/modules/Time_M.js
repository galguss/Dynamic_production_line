const mongoose = require('mongoose');

const TimesDB = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Times', TimesDB);