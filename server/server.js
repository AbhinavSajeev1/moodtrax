const express = require("express");
const cors = require("cors");
const pool = require("./db")
const app = express();
app.use(cors());
app.use(express.json());


let data = [
    {
        id: 1,
        mood: 8,
        note: "hello",
        time: ""
    }
]

app.get("/entries", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM entries");
        res.json(result.rows)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
})

app.post("/entries", async (req, res) => {

    try {
        const query = "INSERT INTO entries (id, mood, note, time) VALUES ($1, $2, $3, $4) RETURNING *"
        const {id, mood, note, time} = req.body

        const values = [id, mood, note, time]
        const result = await pool.query(query, values)

        res.status(201).json({
            message: "User created successfully",
            entry: result.rows[0]
        })
    }

    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
})

app.delete('/entries/:id', async (req, res) => {
    try {

        const { id } = req.params
        await pool.query("DELETE FROM entries WHERE id = $1", [id])
        res.json({success: true})   
    }

    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
})

app.put('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { mood } = req.body; 

        const result = await pool.query(
            "UPDATE entries SET mood = $1 WHERE id = $2 RETURNING *", [mood, id]
        )

        res.json(result.rows[0])
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }

})



pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(result.rows)
    }
})

app.listen(3001, ()=>{
    console.log('Server is running')
})
