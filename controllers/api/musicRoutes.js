const router = require('express').Router();
require('dotenv').config();

router.get('/:localeId', async (req, res) => {
    
    const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${req.params.localeId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_DEEZER_KEY,
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const songInfo = await response.json();
        const top10Songs = songInfo.tracks.data.slice(0, 10);
        // console.log(top10Songs);
        res.json(top10Songs);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
