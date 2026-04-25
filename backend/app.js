const express = require("express")

const app = express()
const port = 4000
const db = require("./utils/connection_db")
const cors = require("cors")
require("./model")

const userRouter = require("./routes/userRoute")
const expenseRouter = require("./routes/expenseRoute")
const authRoutes = require("./routes/auth.routes")
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json())
// cors()
app.use(cors())
app.use("/users", userRouter)
app.use("/expense", expenseRouter)
// payment route
app.use("/payment", paymentRoutes);

app.use('/api/auth',authRoutes)



db.sync({alter:true})
    .then(() => console.log("db ok"))
    .catch(() => console.log("error in db "))


app.listen(port, () => {
console.log(`Serveris running ${port}`)
})