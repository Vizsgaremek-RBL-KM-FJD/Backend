const express = require('express');
const router = express.Router();
const rents = require('../services/rents');

router.get('/', async (req, res, next) => {
    try {
        const rentsList = await rents.getRents();
        res.json(rentsList);
    } catch (error) {
        next(error);
    }
        
});

router.post('/', async (req, res, next) => {
    try{
        const result = await rents.createRent(userID, placeID, startDate, endDate);
        res.json({message: 'Rent created', result});
    } catch (error) {
        next(error);
    }
});

module.exports = router;