
const express = require('express');
const app = express();

const { Chronicle } = require('../../build/index');
const chronicle = new Chronicle(app);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/test', (req, res) => {
    res.json({
        foo: "bar",
        foo1: "bar",
        foo2: "bar",
        foo3: "bar",
        foo4: "bar",
    });
});

app.listen(3001)
