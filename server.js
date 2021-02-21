// Chamar o Express
const express = require('express')
// Chamar o Nunjucks
const nunjucks = require('nunjucks')

// Criar o servidor
const server = express()

// "Importa" o conteúdo do arquivo "data.js" e o salva em uma const de nome "videos"
const videos = require("./data")

// Arquivos estáticos da pasta public
server.use(express.static('public'))

// Setar a view engine
server.set('view engine', 'njk')

// Configurar alguma coisa
nunjucks.configure('views', {
    express: server,
    autoescape: false, // Funciona, por exemplo, quando tem tags HTML no meio de uma string
    noCache: true // Desativa o cache do Nunjucks
})

// Criar a rota do about
server.get('/', function (req, res) {
    // Criando um objeto que será enviado junto com a requisição
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        name: "Mayk Brito",
        role: "Instrutor - Rocketseat",
        description: 'Programador full-stack, focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/maykbrito" },
            { name: "Twitter", url: "https://twitter.com/maykbrito" },
            { name: "Linkedin", url: "https://linkedin.com/in/maykbrito" }
        ]
    }

    // Retornando a rota e o objeto junto com a requisição
    return res.render('about', { about })
})

// Criar a rota do portfolio
server.get('/portfolio', function (req, res) {

    // Retorna à requisição a rota do portfolio e um objeto com a propriedade "items", que possui nela um array de nome videos, importado externamente
    return res.render('portfolio', { items: videos })
})

server.get('/video', function (req, res) {
    // Cria a const id e pega o "id" da query string da requisição (http://localhost:5000/video?id=idpegoaquioh)
    const id = req.query.id

    // Se o id da requisição for igual ao id de algum vídeo, esse vídeo é armazenado na const
    // A função find varre o array videos e quando a função retorna true, esta retorna para a const o item video em questão
    const video = videos.find(function (video) {
        return video.id == id
    })

    // Se não tem nada na const video, significa que não foi encontrado nada, e, portanto, "Video not found!""
    if (!video) {
        return res.send("Video not found!")
    }

    // Retorna à requisição a rota e o vídeo com o id correto
    return res.render('video', { item: video })
})

// Iniciar o servidor, que passa a escutar a porta definida
// A função callback é executada assim que a conexão é estabelecida
server.listen(5000, function () {
    console.log('server is running')
})