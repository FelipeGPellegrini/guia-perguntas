const express = require("express");
const app = express();

app.set("view engine", "ejs")


app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    let exibirMsg = true;
    let produtos = [
        {nome: "Doritos",preco: 3.14},
        {nome: "Coca-cola",preco:5},
        {nome: "Leite",preco:1.45},
        {nome: "Carne", preco:15},
        {nome: "Redbull", preco: 6},
        {nome: "Nescau", preco: 4}
    ]
    res.render("index", {
        nome,
        lang,
        empresa: "Guia do programador",
        inscritos: 8000,
        exibirMsg,
        produtos
    })
})

app.listen(8080, () => {
    console.log("App rodando!!")
})