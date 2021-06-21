const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save();

    res.send(movie);
});

// router.put('/:id', async (req, res) => {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, { new: true });

//     if (!customer) return res.status(404).send('The customer with given ID not found');

//     res.send(customer);
// });

// router.delete('/:id', async (req, res) => {
//     const customer = await Customer.findByIdAndRemove(req.params.id);

//     if (!customer) return res.status(404).send('The customer with given ID not found');

//     res.send(customer);
// });

// router.get('/:id', async (req, res) => {
//     const customer = await Customer.findById(req.params.id);

//     if (!customer) return res.status(404).send('The customer with given ID not found');

//     res.send(customer);
// });

module.exports = router;