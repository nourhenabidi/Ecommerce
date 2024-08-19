const express = require("express")
const cors = require('cors')
const itemRouter = require("./routes/ProductRouter")
const userRouter = require ("./routes/UserRouter")
const userAuthRouter = require("./routes/UserAuthcontRouter");
const { verifyUser } =require ("./middlewares/userMid.js");
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

app.use("/api/auth", userAuthRouter); // Auth routes: login, signup
//user routes
app.use("/api/users",verifyUser,userRouter)
app.use("/api/products",verifyUser,itemRouter)
// app.use('/api/auth',auth)
app.use("/api/wishlist",verifyUser,wishListRouter)
app.use("/api/card",verifyUser,cardRouter)

