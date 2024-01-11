const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.set("view engine", "ejs")
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false})) // Le oq foi enviado pelo formulário
app.use(bodyParser.json()) // opcional


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo
    let desc = req.body.descricao
    res.send(`Formulário recebido.Título: ${titulo} \n Descrição: ${desc}`)
})

app.listen(8000, () => {
    console.log("App rodando!!")
})