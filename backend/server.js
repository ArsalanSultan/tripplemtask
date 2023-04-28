const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes')

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api',authRoute)
const PORT = process.env.PORT || 3021;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/loginapp'
mongoose.connect(MONGO_URL);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
  