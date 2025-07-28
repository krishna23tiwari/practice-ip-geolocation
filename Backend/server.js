const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 7676
const cors =  require('cors')

app.use(express.json())
app.use(cors())

const monogurl = "mongodb+srv://krishna23tiwarikt:krishna23@cluster0.qsevc9h.mongodb.net/test-ip-location"

mongoose.connect(monogurl)
.then(() => console.log("connected"))
.catch(() => console.log("not connected"))

const visitorRoute = require("./Router/VisitorRouter");

app.use('/visitor', visitorRoute)

app.listen(port, () => {
    console.log(`${port} is listning`)
})