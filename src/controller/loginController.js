const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.index = (req, res) => {
    res.render('login/login')
}

exports.authenticate = async (req, res) => {
    const { email, password } = req.body

    try {
        await User.findOne({ email }).then(data => {
            if(data != undefined) {
                let correct = bcrypt.compareSync(password, data.password)
    
                if(correct) {
                    req.session.user = {
                        id: data._id,
                        name: data.name,
                        email: data.email
                    }
                    
                    req.session.save(() => res.redirect('/'))
                } else {
                    req.flash('err', 'Email ou senha incorreta.')
                    req.session.save(() => res.redirect('/login'))
                }
            } else {
                req.flash('err', 'Email ou senha incorreta.')
                req.session.save(() => res.redirect('/login'))
            }
        })
    } catch (err) {
        console.log(err)
    }
    
}

// rota GET para sair da sessão
exports.logout = (req, res) => {
    req.session.user = undefined
    res.redirect('/login')
}
