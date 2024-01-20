const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

// DATABASE

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    })
    .catch((error) => {
        console.log(error)
    })

app.set("view engine", "ejs")
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false })) // Le oq foi enviado pelo formulário
app.use(bodyParser.json()) // opcional


app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] //ordenação 
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas
        })
    }) // Equivalente ao a SELECT ALL FROM ... 

})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo // tem q ser o mesmo name q foi setado no form
    let descricao = req.body.descricao // tem q ser o mesmo name q foi setado no form
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    }) // O método create é o equivalente a INSERT IN TO ...
})

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: { id: id },
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {

                res.render("pergunta", {
                    pergunta,
                    respostas
                })
            })

        } else {
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta
    Resposta.create({
        corpo,
        perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    })
})

app.listen(8000, () => {
    console.log("App rodando!!")
})