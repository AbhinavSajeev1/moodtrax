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

app.listen(3001, ()=>{
    console.log('Server is running')
})
