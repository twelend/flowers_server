require('dotenv').config()
const express = require('express');
var cors = require('cors');
const router = require('./routes/flower.routes');
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', router)
const PORT = process.env.PORT

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port http://localhost:${PORT}`)
        })        
    } catch (error) {
        console.warn(error)
    }
}

start()