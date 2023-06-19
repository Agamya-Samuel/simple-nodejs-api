const express = require('express')
const router = express.Router()
const Subscriber = require('../model/models')

// Get all ids
router.get('/', async (req, resp) => {
    try {
        const subscribersList = await Subscriber.find({}, null)
        resp.json(subscribersList)
    } catch (err) {
        resp.status(500).json( {message: err.message})
    }
})

// Get one id
router.get('/:imdbId', getSubscriber, (req, resp) => {
    // try {
    //     const subscriber = await Subscriber.find({'_id': req.params.imdbId})
    //     resp.json(subscriber)
    //     // return notFound Status code when no entry found
    // } catch (err) {
    //     resp.status(500).json( {message: err.message})
    // }

    resp.status(200).json(resp.subscriber)
})

// Get id with (general query options => ($gt $gte $lt $lte))
router.get('/:olderThan', async (req, resp) => {
    try {
        const subscriber = await Subscriber.find({'year': {$lt: req.params.olderThan}})
        resp.json(subscriber)
    } catch (err) {
        resp.status(500).json( {message: err.message})
    }
})

// Create one id
router.post('/', async (req, resp) => {
    const subscriber = new Subscriber({
        _id: req.body.id,
        name: req.body.name,
        age: req.body.age
    })
    try {
        const newSubscriber = await subscriber.save()
        resp.status(201).json(newSubscriber)
    } catch (err) {
        resp.status(400).json( {message: err.message})
    }
})

// Update one id
router.patch('/:imdbId', getSubscriber, async (req, resp) => {
    if (req.body.name != null) { resp.subscriber.name = req.body.name }
    if (req.body.age != null) { resp.subscriber.age = req.body.age }
    try {
        const updatedSubscriber = await resp.subscriber.save()
        resp.status(200).json(updatedSubscriber)
    } catch (err) {
        resp.status(400).json( { message: err.message})
    }
})

// Delete one id
router.delete('/:imdbId', getSubscriber, async (req, resp) => {
    try {
        await Subscriber.deleteOne(resp.subscriber)
        resp.status(202).json({ message: 'Deleted IMDB id Successfully'})
    } catch (err) {
        resp.status(500).json({ message: err.message})
    }
})

async function getSubscriber(req, resp, nextFunct) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.imdbId)
        if (subscriber == null) {
            return resp.status(404).json({ message: 'Cannot find the IMDB id'})
        }
    } catch (err) {
        return resp.status(500).json( {message: err.message})
    }

    resp.subscriber = subscriber
    nextFunct()
}

module.exports = router