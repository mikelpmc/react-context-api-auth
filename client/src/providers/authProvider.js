import React, { createContext, useContext, useReducer } from 'react';
import { AuthService } from '../services';

const AuthState = createContext();
const AuthDispatch = createContext();

const EVENT_TYPES = {
    UPDATE: 'update',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_ERROR: 'login_error',
    LOGOUT: 'logout',
    CLEAR_ERRORS: 'clear_errors',
    ERROR: 'error'
};

const EVENTS = {
    [EVENT_TYPES.UPDATE]: (state, event) => {
        const { name, value } = event.payload;

        return {
            ...state,
            [name]: value
        };
    },
    [EVENT_TYPES.LOGIN_SUCCESS]: state => {
        return {
            ...state,
            isLoggedIn: true
        };
    },
    [EVENT_TYPES.LOGIN_ERROR]: (state, event) => {
        const { error } = event.payload;
        return {
            ...state,
            isLoggedIn: false,
            error
        };
    },
    [EVENT_TYPES.LOGOUT]: () => {
        return {
            name: '',
            email: '',
            password: '',
            error: '',
            isLoggedIn: false
        };
    },
    [EVENT_TYPES.ERROR]: (state, event) => {
        const { error } = event.payload;
        return {
            ...state,
            error
        };
    },
    [EVENT_TYPES.CLEAR_ERRORS]: state => {
        return {
            ...state,
            error: ''
        };
    }
};

const INITIAL_STATE = {
    isLoggedIn: AuthService.isLoggedIn(),
    name: '',
    email: '',
    password: '',
    error: ''
};

const AuthReducer = (state, event) => {
    return EVENTS[event.type](state, event) || state;
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    const handleUpdate = event => {
        const name = event.target.name;
        const value = event.target.value;

        dispatch({ type: EVENT_TYPES.UPDATE, payload: { name, value } });
    };

    const handleRegister = () => {
        const { name, email, password } = state;

        AuthService.register(name, email, password)
            .then(handleLogin)
            .catch(({ message }) => {
                dispatch({
                    type: EVENT_TYPES.ERROR,
                    payload: { error: message }
                });
            });
    };

    const handleLogin = () => {
        const { email, password } = state;
        AuthService.login(email, password)
            .then(() => {
                dispatch({ type: EVENT_TYPES.LOGIN_SUCCESS });
            })
            .catch(({ message }) => {
                dispatch({
                    type: EVENT_TYPES.LOGIN_ERROR,
                    payload: { error: message }
                });
            });
    };

    const handleLogout = () => {
        AuthService.logout().then(() => {
            dispatch({ type: EVENT_TYPES.LOGOUT });
        });
    };

    const handleClearErrors = () => {
        dispatch({ type: EVENT_TYPES.CLEAR_ERRORS });
    };

    const events = {
        onUpdate: handleUpdate,
        onRegister: handleRegister,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onClearErrors: handleClearErrors
    };

    return (
        <AuthState.Provider value={state}>
            <AuthDispatch.Provider value={events}>
                {children}
            </AuthDispatch.Provider>
        </AuthState.Provider>
    );
};

const useAuthState = () => {
    const context = useContext(AuthState);

    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }

    return context;
};

const useAuthDispatch = () => {
    const context = useContext(AuthDispatch);

    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider');
    }

    return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
