const express = require("express")
const cors = require('cors')
const itemRouter = require("./routes/ProductRouter")
const userRouter = require ("./routes/UserRouter")
const userAuthRouter = require("./routes/UserAuthcontRouter");
const wishListRouter=require("./routes/WishRouter.js")
const cardRouter=require("./routes/CardRout.js")

const app = express()
const PORT = 5000
//email
const session = require('express-session');
// require('dotenv').config();





// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Middleware to handle sessions
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})


//user routes

app.use('/api/up',userAuthRouter)
app.use("/api/users",userRouter)
//prod routes
app.use("/api/products",itemRouter)
app.use("/api/wishlist",wishListRouter)
app.use("/api/card",cardRouter)

