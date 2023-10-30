exports.middlewareGlobal = (req, res, next) => {
    res.locals.err = req.flash('err');  
    res.locals.success = req.flash('success');  
    next();
}

exports.admAuth = (req, res, next) => {
    if(req.session.user != undefined) {
        next()
    } else {
        res.redirect('/login')
    }
}