const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.index = (req, res) => {
    res.send('Hello Word.')
}

// cadastrando usuario
exports.create = async (req, res) => {
    const { email, password } = req.body

    if (email == '' || password == '') {
        res.json({err: 'necessario preencher todos os requesito.'})
    }

    const userExist = await User.findOne({ email })

    try {
        if(!userExist) {
            let salt = bcrypt.genSaltSync(8)
            let hash = bcrypt.hashSync(password, salt)

            await User.create({ email, password: hash })
            res.json({ok: 'usuario registrado com sucesso'})
        } else {
            res.json({err: 'usuario já existe'})
        }
    } catch (err) {
        res.json(err)
    }

}
