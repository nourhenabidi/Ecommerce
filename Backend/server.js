const express = require("express")
const cors = require('cors')
const itemRouter = require("./routes/ProductRouter")
const userRouter = require ("./routes/UserRouter")
const auth = require ('./Authentification/user')

const app = express()
const PORT = 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})


//user routes
app.use("/api/users",userRouter)
app.use("/api/auth", auth)
app.use("/api/products",itemRouter)


