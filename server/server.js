require("dotenv").config()
const express = require("express");
const cors = require("cors");
const pool = require("./db")
const app = express();
app.use(cors());
app.use(express.json());

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY)

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
        const result = await supabase
        .from("entries")
        .select('*')

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
        const {id, mood, note, time} = req.body
        const entryEnter = await supabase
        .from("entries")
        .insert({
            id: id, mood: mood, note: note, time: time
        })
        .select()

        if (entryEnter.error) {
            res.json({success: false})
        }
        else if (entryEnter.data.length = 0) {
            res.json({success: false})
        }
        else {
            res.json({success: true})
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

app.listen(3001, ()=>{
    console.log('Server is running')
})
