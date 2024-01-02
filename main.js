const express = require('express');
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 9000;

app.use(express.json());

const upload = multer();

// Usando o body-parser para processar o corpo da requisição
app.use(bodyParser.text({ type: 'text/html' }));

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.post('/gerar-pdf', upload.none(),(req, res) => {
    const { htmlString } = req.body;

    const options = {
        width: "595",
        height: "2040",
        orientation: 'portrait',
    };

    pdf.create(htmlString, options).toFile('./pdf/gerado_mm_4.pdf', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });

    res.status(200).send('HTML recebido com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});