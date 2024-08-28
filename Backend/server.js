const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');
const itemRouter = require("./routes/ProductRouter")
const userRouter = require ("./routes/UserRouter")
const userAuthRouter = require("./routes/UserAuthcontRouter");
const wishListRouter=require("./routes/WishRouter.js")
const cardRouter=require("./routes/CardRout.js")
require('dotenv').config()
const app = express()
const PORT = 5000
//email
app.use(bodyParser.json());
// require('dotenv').config();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Middleware to handle sessions


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

