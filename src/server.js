const app = require('./app');

app.on('ok', () => {
    app.listen(3030, () => {
        console.log('Acessar: http://localhost:3030')
        console.log('Servidor funcionando com sucesso.')
    })
})
