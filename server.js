const express = require('express')
const connect = require("./Config/db")
const Errorhandler = require("./middleware/errorhandler")
const app = express();
const signup = require("./routes/musicSignup");
const login = require("./routes/musiclogin")
const application = require("./routes/musicData")
const cors = require("cors")
// require('dotenv').config();

connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// routes
app.use("/signup", signup );
app.use("/login", login );
app.use("/application", application );

app.use(Errorhandler);


app.get("/api/health" ,(req,res) =>{
    res.send(`backend server is active status: active & time:${ new Date()}`)
})


// error handling
app.use(function (req, res, next) {
    res.status(404).send("Something went wrong! Please try after some time.");
  })


//connection part
const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost"
app.listen(port, () => {
    console.log(`Express server listening at http://${host}:${port}`)
})
