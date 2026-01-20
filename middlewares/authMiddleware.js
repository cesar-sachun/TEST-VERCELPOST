export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

export const isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/');
};

export const isPremium = (req, res, next) => {
    if (req.session.user && req.session.user.es_premium) {
        return next();
    }
    res.redirect('/');
};
