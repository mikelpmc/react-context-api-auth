const jwt = require('jsonwebtoken');

let _secret = 'NO-SECRET';

const permitValidator = (...allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        const auth = req.get('authorization');

        const token = auth.split(' ')[1];

        const { role } = jwt.verify(token, _secret);

        if (isAllowed(role[0])) next();
        else {
            res.status(403).json({
                status: 'KO',
                error: 'No tienes permisos para realizar esta acción.'
            });
        }
    };
};

module.exports = function(secret) {
    _secret = secret;

    return permitValidator;
};
