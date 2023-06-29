const express = require('express');
const Router = express.Router();

const TimeDB = require('../modules/Time_M');

Router.get('/Add', (req, res) => {
    res.render('AddProcess', { item : {} });
});

Router.post('/Add', (req, res) => {
    try {
        const { Name_Machine, Heating, Light_level, component_activation, delay_time } = req.body;
        const modelData = new TimeDB({
        Name_Machine: Name_Machine,
        Heating: Heating,
        Light_level: Light_level,
        component_activation: component_activation,
        delay_time: delay_time,
        ProcessInAction: false
    });
        modelData.save();
        res.redirect('/Web/List');
    } catch (error) {
        console.log(error);
        res.send("ערך הזמן המינימלי הוא 2 שניות");
    }    
});

Router.get('/List', async (req, res) => {
    const dataTimes = await TimeDB.find();
    res.render('ListProcess', { data : dataTimes })
});

Router.get('/Edit', async (req, res) => {
    const itemData = await TimeDB.findById(req.query.id);
    res.render('AddProcess', {item : itemData});
});

Router.post('/Edit', async (req, res) => {
    const { Name_Machine, Heating, Light_level, component_activation, delay_time } = req.body;
    const modelData = {
        Name_Machine: Name_Machine,
        Heating: Heating,
        Light_level: Light_level,
        component_activation: component_activation,
        delay_time: delay_time,
    };
    await TimeDB.findByIdAndUpdate(req.query.id, modelData);
    res.redirect('/Web/List');
});

Router.post('/Edit/Off', async (req, res) => {
    const modelData = {
        ProcessInAction: false
    };
    await TimeDB.findByIdAndUpdate(req.body.id, modelData);
    res.redirect('/Web/List');
});

Router.post('/Delete', async (req, res) => {
    const { id } = req.body;
    await TimeDB.findByIdAndDelete(id);
    res.redirect('/Web/List');
});


module.exports = Router;