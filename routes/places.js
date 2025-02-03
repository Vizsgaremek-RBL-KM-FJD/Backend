const express = require('express');
const router = express.Router();
const places = require('../services/places');

router.get('/', async (req, res, next) => {
    try {
        res.json(await places.getPlaces());
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try{
        res.json(await places.createPlace(userId, address, placeName, price));
    } catch (error) {
        next(error);
    }
    
})

router.put('/:id', async (req, res, next) => {
    try{
        res.json(await places.updatePlace(req.params.id, req.body));
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        res.json(await places.deletePlace(req.params.id));
    } catch (error) {
        next(error);
    }
})

module.exports = router;