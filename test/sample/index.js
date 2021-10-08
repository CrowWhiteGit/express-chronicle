
const express = require('express');
const app = express();

const { Chronicle } = require('../../build/index');
const chronicle = new Chronicle(app);

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(3001)
