const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const jwtValidation = require('./../utils/jwt-validation');

const userRouter = express.Router();

const jsonBodyParser = bodyParser.json();

const logic = require('./../logic/');

const {
    env: { TOKEN_SECRET, TOKEN_EXP }
} = process;

const jwtValidator = jwtValidation(TOKEN_SECRET);

// Register
userRouter.post('/register', jsonBodyParser, (req, res) => {
    const {
        body: { name, email, password }
    } = req;

    logic
        .register(name, email, password)
        .then(user =>
            res.status(201).json({
                status: 'OK',
                message: 'User registered succesfully',
                user
            })
        )
        .catch(({ message }) =>
            res.status(400).json({ status: 'KO', message })
        );
});

// Authenticate
userRouter.post('/authenticate', jsonBodyParser, (req, res) => {
    const {
        body: { email, password }
    } = req;

    logic
        .authenticate(email, password)
        .then(({ _id: id, email }) => {
            const token = jwt.sign({ id }, TOKEN_SECRET, {
                expiresIn: TOKEN_EXP
            });

            res.json({
                status: 'OK',
                message: 'User authenticated succesfully',
                user: { id, email },
                token
            });
        })
        .catch(({ message }) =>
            res.status(403).json({ status: 'KO', message })
        );
});

// Retrieve user data
userRouter.get('/user/:userId', jwtValidator, (req, res) => {
    const { userId } = req.params;

    logic
        .retrieveUserById(userId)
        .then(user =>
            res.json({
                status: 'OK',
                message: 'User data retrieved correctly',
                user
            })
        )
        .catch(({ message }) =>
            res.status(404).json({ status: 'KO', message })
        );
});

module.exports = userRouter;
