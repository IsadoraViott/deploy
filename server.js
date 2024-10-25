// Importar pacotes para a aplicação
const express = require('express');
const cors = require('cors');
// Definir a porta do express e instanciar o express
const porta = 3001;
const app = express();
// Habilitar o cors e utilização de JSON
app.use(cors());
app.use(express.json())
// Testar API
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
// Importar a conexão com o banco
const connection = require('./db_config');

// Rotas //

// usuários //

app.post('/usuarios/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha 
    );
    let query = "INSERT INTO usuarios(nome, email, senha) VALUES (?,?,?)";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    });

});

// loguin

app.post('/login', (request, response) => {
    let params = Array(
        request.body.nome
    )
    let query = "SELECT id,nome,email,senha FROM usuarios WHERE nome = ?";
 
    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigita = request.body.senha
            let senhaBanco = results[0].senha
 
            if(senhaBanco === senhaDigita){
 
                response    
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                    })
            } else{
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua senha!"
                    })
            }
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Nome não cadastrado!"
                    })
            }
 
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso"
                })
        })
 
    })
