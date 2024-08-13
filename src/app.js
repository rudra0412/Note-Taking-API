const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const notesRouter = require('./routes/notes');

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://dmahajanr:0UQ0zhTyeodCuSIl@backenddb.nvko7.mongodb.net/Note-taking-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
    app.get('/', (req, res) => {
        res.send('Welcome to the Note-Taking API.');
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/notes', notesRouter);
})
.catch(() => {
    console.log("Connection failed!");
});

module.exports = app;
