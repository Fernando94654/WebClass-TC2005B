const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use((req, res, next) => {
    if (req.url.endsWith('.br')) {
        res.set('Content-Encoding', 'br');
        if (req.url.endsWith('.js.br')) {
            res.set('Content-Type', 'application/javascript');
        } else if (req.url.endsWith('.wasm.br')) {
            res.set('Content-Type', 'application/wasm');
        } else if (req.url.endsWith('.data.br')) {
            res.set('Content-Type', 'application/octet-stream');
        }
    }
    if (req.url.endsWith('.gz')) {
        res.set('Content-Encoding', 'gzip');
        if (req.url.endsWith('.js.gz')) {
            res.set('Content-Type', 'application/javascript');
        } else if (req.url.endsWith('.wasm.gz')) {
            res.set('Content-Type', 'application/wasm');
        } else if (req.url.endsWith('.data.gz')) {
            res.set('Content-Type', 'application/octet-stream');
        }
    }
    next();
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Frontend y juego de Unity corriendo en: http://localhost:${PORT}`);
    console.log(`Para ver el juego, entra a: http://localhost:${PORT}/game.html`);
});