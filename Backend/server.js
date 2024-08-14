const express = require("express")
const cors = require('cors')
const itemRouter = require("./routes/ProductRouter")
const userRouter = require ("./routes/UserRouter")
const loginRouterUser=require('./routes/LoginRout.js')
const signupRouterUser=require('./routes/SignupRout.js')
const wishListRouter=require("./routes/WishRouter.js")
const cardRouter=require("./routes/CardRout.js")
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
app.use("/api/products",itemRouter)
app.use('/api',loginRouterUser)
app.use('/api',signupRouterUser)
app.use("/api/wishlist",wishListRouter)
app.use("/api/card",cardRouter)

