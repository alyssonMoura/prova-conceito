var http = require('http');
var fs = require("fs");

var path = "./files/texto.txt";

var indexKey = ["description", "classifier", "openingBalance", "debit", "credit", "finalBalance", "parent"];
var regex = {
    description: '[^0-9]+',
    classifier: '[0-9]+',
    openingBalance: '[0-9]+',
    debit: '[0-9]+',
    credit: '[0-9]+',
    finalBalance: '[0-9]+',
    parent: null
};
var obj = {
    description: '',
    classifier: '',
    openingBalance: '',
    debit: '',
    credit: '',
    finalBalance: '',
    parent: null
};
var object = [];
objetoGerado = (linha) => {
    var obj = {};
    indexKey.map((campo) => {
        const reg = new RegExp(regex[campo]);
        if (reg.test(linha)) {
            const teste = reg.exec(linha);
            linha = linha.replace(reg, ' ');
            obj[`${campo}`] = teste[0].trim();
        }
    })
    object.push(obj);
    return obj;
}

var contents = fs.readFileSync(path, 'utf8');
console.log(contents);
var linhas = contents.split(/\r?\n/);
console.log(linhas);

linhas.map(function (linha) {
    linha = objetoGerado(linha);
})
json = JSON.stringify(object, undefined, 2);
console.log(json);

fs.writeFile("./files/data.txt", json, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(json);
}).listen(3000);