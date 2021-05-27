'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const router = require('./src/routes/');
const cors = require('cors');

const { userRouter } = require('./src/routes/');

const {
    env: { PORT, DB_URL }
} = process;

mongoose
    .connect(
        DB_URL,
        { useNewUrlParser: true }
    )
    .then(() => {
        const port = PORT || process.argv[2] || 5000;

        const app = express();

        app.use(cors());

        app.use('/api', userRouter);

        app.listen(port, () => console.log(`server running on port ${port}`));

        process.on('SIGINT', () => {
            console.log('\nstopping server');

            mongoose.connection.close(() => {
                console.log('db connection closed');

                process.exit();
            });
        });
    })
    .catch(console.error);
