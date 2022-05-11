const express = require('express');
const router = express.Router();
const db = require('../models')

// Index
router.get('/', async (req, res, next) => {
    try {
        const allSongs = await db.Song.find({})
        res.send(allSongs)

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
})

// New
router.get('/new', async (req, res, next) => {
    try {
        const allStreamDream = await db.StreamDream.find({})
        const context = { streamDreams: allStreamDream}
        res.render('songs/new.ejs', context)

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
})



// Show
router.get('/:songId', async (req, res, next) => {
    try {
        const foundStream = await db.StreamDream.find({StreamDream: req.params.id})
        const foundSong = await db.Song.findById(req.params.songId).populate({
            path: 'stream',
            select: 'artist headerImg img'
        });
        // console.log(foundSong)
        const allComments = await db.Comment.find({song: req.params.songId})
        const context = {
            oneSong: foundSong,
            comments: allComments,
            oneStreamDream: foundStream
        }
        res.render('songs/show.ejs', context)

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
})



// Create
router.post('/', async (req, res, next) => {
    try {
        
        const newSong = await db.Song.create(req.body)
        res.redirect(`/streamDream/${newSong.stream}`)
    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
})






// Update
router.put('/:songId', async (req, res, next) => {
    res.send('hitting song update' +req.params.songId)
})


// Edit
router.get('/:songId/edit', async (req, res, next) => {
    res.send('hitting song edit' + req.params.songId)
})


// Destroy / Delete
router.delete('/:songId', async (req, res, next) => {
    try {
        const deleteSong = await db.Song.findByIdAndDelete(req.params.songId)
        res.redirect('/streamDream/'+deleteSong.stream)
        
    } catch (error) {
        req.error = error;
        return next();
    }
})

module.exports = router


