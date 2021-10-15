
const express = require('express');
const app = express();

const { Chronicle, IConfig } = require('../../build');

/**
 * @type {IConfig}
 */
const config = {
    endpoint: "/chr",
    capacity: 10,
    importantCapacity: 50,
    defaultRuleset: {
        defaultBehavior: "ignore"
    },
    rules: [
        {
            location: '/test',
            defaultBehavior: "common",
            exceptions: [
                {
                    statusCode: 500,
                    behavior: "important"
                }
            ]
        }
    ]
}

const chronicle = new Chronicle(app, config);

app.get('/', (req, res) => {
    res.send('<p>hello world</p>');
});

app.post('/test', (req, res) => {
    if (req.query.fall) {
        res.sendStatus(500);
        return;
    }

    res.json({
        foo: "bar"
    });
});

app.listen(3000)
