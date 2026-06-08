const express = require("express");
const cors = require("cors");
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

app.get("/entries", (req, res) => {
    res.json(data)
})

app.post("/entries", (req, res) => {
    data.push(req.body)
    res.json(req.body) // sends msg to react, data recieved 
    console.log(data)
})

app.delete('/entries/:id', (req, res) => {
    data = data.filter(entry => entry.id !== req.params.id)
    res.json({ success: true})
})

app.put('/entries/:id', (req, res) => {
    const targetEntry = data.map(entry => entry.id == req.params.id
        ? {...entry, mood: req.body.mood}
        : entry
    )
    
    const updatedEntry = data.find(entry => entry.id == req.params.id)
    res.json(updatedEntry)

})

app.listen(3001, ()=>{
    console.log('Server is running')
})
