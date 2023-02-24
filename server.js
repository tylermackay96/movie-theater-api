const app = express();
const port = 3000;

app.use(express.json());

const express = require('express');
const { body, validationResult } = require('express-validator');
const { Show } = require('./models');
const { showRouter } = require('./routers/showRouter'); // import the showRouter

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the showRouter at /shows
app.use('/shows', showRouter);