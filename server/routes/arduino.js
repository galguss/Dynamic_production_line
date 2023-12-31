const express = require('express');
const Router = express.Router();

const TimeDB = require('../modules/Time_M');
const HandleGetID = require('../middlewares/getId');

Router.get('/', HandleGetID(TimeDB), async (req, res) => {
    try {
        const modelData = {
            ProcessInAction: true
        };
        await TimeDB.findByIdAndUpdate(req.ID, modelData);
        res.send(req.ID);
    } catch (error) {
        console.log(error);
        res.send("No machine available");
    } 
});

Router.get('/:process/:ID', async (req, res) => {
    try {
        const ID = req.params.ID.substring(1, req.params.ID.length -1);
        const item = await TimeDB.find({_id: ID});
        res.send( item[0][req.params.process].toString());
    } catch (error) {
        console.log(error);
    }   
});


module.exports = Router;