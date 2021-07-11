# express-chronicle

Work in progress

Example:
```javacsript
const express = require('express');
const app = express();

const { Chronicle } = require('express-chronicle');
const chronicle = new Chronicle(app);

app.get('/test', async (req, res) => {
    res.json({ hello: "hello" });
})

app.listen(3000);
```

1) Init class with express app ```new Chronicle(app)```
2) Open ```/chronicle``` in browser

# TODO
1) Configuration
2) Request details
