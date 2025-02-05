const express = require('express');
const router = express.Router();
const users = require('../services/users');

router.get('/', async (req, res, next) => {
    try {
        res.json(await users.getDatas());
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try{
        res.json(await users.create(req.body));
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        res.json(await users.update(req.params.id, req.body));
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        res.json(await users.remove(req.params.id));
    } catch (error) {
        next(error);
    }
})

router.patch('/:id', async (req, res, next) => {
    try{
        res.json(await users.patch(req.params.id, req.body));
    } catch (error) {
        next(error);
    }
})

module.exports = router;