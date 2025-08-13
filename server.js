const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'memory_db',
    password: 'Krish@0629',
    port: 5432
});

app.post('/add-score', async (req, res) => {
    const { username, score, moves, time_taken } = req.body;
    try {
        await pool.query(
            'INSERT INTO leaderboard (username, score, moves, time_taken) VALUES ($1, $2, $3, $4)',
            [username, score, moves || 0, time_taken || 0]
        );
        res.status(200).send('Score saved');
        console.log('Saving score:', { username, score, moves, time_taken });

    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.get('/leaderboard', async (req, res) => {
    try {
        // Order by score DESC, then time_taken ASC to break ties (better score and faster time wins)
        const result = await pool.query(
            'SELECT username, score, moves, time_taken FROM leaderboard ORDER BY score DESC, time_taken ASC LIMIT 10'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
