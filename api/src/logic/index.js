'use strict';

const mongoose = require('mongoose');
const { User } = require('./../data/');

const { validateEmail } = require('./../utils/validate-email');

const logic = {
    _validateStringField(field, value) {
        if (typeof field !== 'string' || !field.trim().length)
            throw Error(`${field} is not valid`);
    },

    /**
     *
     * @param {*} value
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw Error(`${email} is not a valid email`);
    },

    /**
     * Register a user
     */
    register(name, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email);
                this._validateStringField('password', password);
                this._validateStringField('name', name);

                return User.findOne({ email });
            })
            .then(user => {
                if (user)
                    throw Error(`User with email ${email} already exists`);

                return User.create({ email, password, name });
            })
            .then(({ email, name }) => ({ email, name }));
    },

    /**
     * Authenticates a user
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email);
                this._validateStringField('password', password);

                return User.findOne({ email, password });
            })
            .then(user => {
                if (!user) throw Error(`Wrong credentials`);

                return user;
            });
    },

    /**
     * Retrieves a user by its ID
     */
    retrieveUserById(userId) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('userId', userId);

                return User.findById(userId).select('email name -_id');
            })
            .then(user => {
                if (!user) throw Error(`No data found for user ${userId}`);

                return user;
            });
    }
};

module.exports = logic;
