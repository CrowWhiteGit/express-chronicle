
const express = require('express');
const app = express();

const { Chronicle } = require('../../build/index');
const chronicle = new Chronicle(app);

app.get('/', (req, res) => {
    res.send('<p>hello world</p>');
});

app.post('/test', (req, res) => {
    res.json({
        foo: "bar",
        foo1: "bar",
        foo2: "bar",
        foo3: "bar",
        foo4: "bar",
        foo1: "bar",
        foo11: "bar",
        foo21: "bar",
        foo31: "bar",
        foo41: "bar",
        foo2: "bar",
        foo12: "bar",
        foo22: "bar",
        foo32: "bar",
        foo42: "bar",
    });
});

app.listen(3001)
