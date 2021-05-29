const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const submissionRouter = require("./routes/api/submission");

dotenv.config();

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

const app = express();

//Middleware
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors({
    origin: [process.env.ORIGIN],
    credentials: true
}));
app.use(express.json());

//Routers
app.use("/api/submission", submissionRouter);

//Connect to database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once("open", () => {
    console.log("Connection to database successful");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});