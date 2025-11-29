const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json("salom")
})

app.listen(3000, () => {
    console.log("Server ishladi");
})