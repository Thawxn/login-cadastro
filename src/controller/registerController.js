const User = require('../models/User');
const bcrypt = require('bcrypt');

// rota GET de cadastro
exports.index = (req, res) => {
    res.render('register/register')
}

// rota POST de cadastro
exports.create = async (req, res) => {
    const { name, email, password } = req.body

    if (name == '' || email == '' || password == '') {
        req.flash('err', 'Necessario preencher todos os campos')
        req.session.save(() => res.redirect('/register'))
    }

    const userExist = await User.findOne({ email })

    try {
        if(!userExist) {
            let salt = bcrypt.genSaltSync(8)
            let hash = bcrypt.hashSync(password, salt)

            await User.create({name, email, password: hash })
            req.flash('success', 'Usuario criado com sucesso.')
            req.session.save(() => res.redirect('/register'))
        } else {
            req.flash('err', 'Usuário já cadastrado.')
            req.session.save(() => res.redirect('/register'))
        }
    } catch (err) {
        console.log(err)
    }

}
