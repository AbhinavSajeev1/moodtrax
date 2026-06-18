require("dotenv").config()
const express = require("express");
const cors = require("cors");
const pool = require("./db")
const app = express();
app.use(cors());
app.use(express.json());

const { createClient } = require("@supabase/supabase-js");

let supabase;

function initSupabase() {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
}

let data = [
    {
        id: 1,
        mood: 8,
        note: "hello",
        time: ""
    }
]

initSupabase();

app.get("/entries", async (req, res) => {
    try {
        const user_id = req.query.user_id
        let query = supabase
        .from("entries")
        .select('*');

        if (user_id) {
            query = query.eq("user_id", user_id)
            console.log(query)
        }

        const result = await query

        if (result.error) {
            res.json({success: false})
        }
        else {
            res.json(result.data)
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
})

app.post("/entries", async (req, res) => {

    try {
        const {id, mood, note, time, user_id} = req.body
        const entryEnter = await supabase
        .from("entries")
        .insert({
            id: id, mood: mood, note: note, time: time, user_id: user_id
        })
        .select()

        if (entryEnter.error) {
            res.json({success: false})
        }
        else if (entryEnter.data.length === 0) {
            res.json({success: false})
        }
        else {
            res.json(entryEnter.data[0])
        }
    }

    catch (error) {
        console.error(error)
        res.status(500).json({error: "Database error"})
    }
})

app.delete('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await supabase
            .from("entries")
            .delete()
            .eq('user_id', req.query.user_id)
            .eq('id', id)
            .select()
            console.log(response)
        if (response.error) {
            res.json({success: false})   
        }
        else if (response.data.length == 0){
            res.json({success: false})
        }
        else {
            res.json({success: true})
        }
    }

    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }
})

app.put('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { mood } = req.body

        const response = await supabase
            .from("entries")
            .update({mood})
            .eq('id', id)
            .eq('user_id', req.query.user_id)
            .select()

        console.log(response)

        if (response.error) {
            res.json({success: false})
        }
        else if (response.data.length === 0) {
            res.json({success: false})
        }
        else {
            res.json({success: true})
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: "Database error"})
    }

})

const PORT = process.env.PORT || 3001;

app.listen(PORT);