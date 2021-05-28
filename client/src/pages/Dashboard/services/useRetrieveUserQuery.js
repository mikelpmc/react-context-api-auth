import { useEffect, useState } from 'react';
import { AuthService } from '../../../services';

const STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

const useRetrieveUserQuery = () => {
    const [user, setUser] = useState();
    const [status, setStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        setStatus(STATUS.LOADING);

        AuthService.retrieveUser()
            .then(user => {
                setUser(user);
                setStatus(STATUS.SUCCESS);
            })
            .catch(() => setStatus(STATUS.ERROR));
    }, []);

    return {
        loading: status === STATUS.LOADING,
        error: status === STATUS.ERROR ? status : '',
        data: user
    };
};

export default useRetrieveUserQuery;
