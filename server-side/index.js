const express = require('express')
const PORT = 8001
const app = express()
const {db} = require("./database")
const cors = require('cors')
const {authRoutes} = require('./routes')

app.use(cors())

app.use(express.json())

// app.get('/user', async (req, res) => {
//     let fetchQuery = 'SELECT * FROM users'
//     db.query(fetchQuery, (err, result) => {
//         return res.status(200).send(result)
//     })
// })

app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})