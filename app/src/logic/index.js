// eslint-disable-next-line
'use strict';

const { validateEmail } = require('./../utils/validate-email');

const logic = {
    _url: process.env.REACT_APP_API_BASE_URL,

    /**
     *
     * @param {*} field
     * @param {*} value
     */
    _validateStringField(field, value) {
        if (typeof value !== 'string' || !value.trim().length)
            throw Error(`${field} is not valid`);
    },

    /**
     *
     * @param {*} email
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw Error(`${email} is not a valid email`);
    },

    /**
     *
     * @param {*} userId
     */
    _userId(userId) {
        if (typeof userId !== 'undefined') {
            sessionStorage.setItem('userId', userId);

            return;
        }

        return sessionStorage.getItem('userId');
    },

    /**
     *
     * @param {*} token
     */
    _token(token) {
        if (typeof token !== 'undefined') {
            sessionStorage.setItem('token', token);

            return;
        }

        return sessionStorage.getItem('token');
    },

    /**
     *
     */
    isLoggedIn() {
        const res = !!(this._userId() && this._token());

        return res;
    },

    /**
     *
     * @param {*} email
     * @param {*} password
     * @param {*} name
     */
    register(name, email, password) {
        return Promise.resolve().then(() => {
            this._validateStringField('name', name);
            this._validateEmail(email);
            this._validateStringField('password', password);

            return fetch(`${this._url}/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 201) {
                        return res;
                    }

                    return res.json().then(({ message }) => {
                        throw Error(message);
                    });
                })
                .then(res => res.json())
                .then(() => true);
        });
    },

    /**
     *
     * @param {*} email
     * @param {*} password
     */
    login(email, password) {
        return Promise.resolve().then(() => {
            this._validateEmail(email);
            this._validateStringField('password', password);

            return fetch(`${this._url}/authenticate`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        return res;
                    }

                    return res.json().then(({ message }) => {
                        throw Error(message);
                    });
                })
                .then(res => res.json())
                .then(({ token, user }) => {
                    this._token(token);
                    this._userId(user.id);

                    return true;
                });
        });
    },

    /**
     *
     */
    logout() {
        delete this.token;
        delete this.userId;

        sessionStorage.clear();
    },

    retrieveUser() {
        return fetch(`${this._url}/user/${this._userId()}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${this._token()}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res;
                }

                return res.json().then(({ message }) => {
                    throw Error(message);
                });
            })
            .then(res => res.json())
            .then(({ user }) => user);
    }
};

module.exports = logic;
