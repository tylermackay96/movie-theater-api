const app = express();
const port = 3000;
const express = require('express');
const { body, validationResult } = require('express-validator');
const { Show } = require('./models');
const { showRouter } = require('./routers/showRouter'); // import the showRouter

// Middleware to parse JSON request bodies
app.use(express.json());


// Mount the showRouter at /shows and User
app.use('/Shows', showRouter);
app.use('/User', userRouter);