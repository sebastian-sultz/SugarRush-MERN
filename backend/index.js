const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const musicRoutes = require('./Routes/musicRoutes');
const quizRoutes =require('./Routes/quizRoutes.js');


const watchRoutes = require('./Routes/watchRoutes');
// const path = require("path");
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use(express.json());

// const _dirname=path.dirname("")
// const buildpath = path.join(_dirname,"../frontend/dist")
// app.use(express.static(buildpath));

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/api/music', musicRoutes);
app.use('/api/quiz', quizRoutes);

// app.use('/api/watches', watchRoutes);

app.use('/', watchRoutes);
app.use('/shop', watchRoutes);




app.use('/api/watches', watchRoutes);

app.use('/cart', require('./Routes/cart'));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})