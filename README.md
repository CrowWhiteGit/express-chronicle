# express-chronicle

Status: Work in progress

Inspired by Silk. This is a module for express.js for logging request-response history and showing it in web interface.
Can be configured to log or ignore specific endpoints, separate critycal responses from expected.

Install with:
`npm i --save CrowWhiteGit/express-chronicle#1.0.1`

Example:
```javacsript
const express = require('express');
const app = express();

const { Chronicle, IConfig } = require('../../build');

/**
 * @type {IConfig}
 */
const config = {
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
```

1) Init class with express app ```new Chronicle(app)```
2) Open ```/chronicle``` in browser

Configuration interface:
| Field | Description |
| --- | --- |
| capacity | type: Number. Number of requests stored in common queue (default 100) |
| importantCapacity | type: Number. Number of requests stored in important queue (default 200) |
| defaultRuleset | type: IRuleset. Change default configuration for all locations. (default behavior 'common') |
| rules | type: Array<IRuleset>. Array of rules for specific locations. (default []) |
    
IRuleset interface:
| Field | Description |
| --- | --- |
| location | Type: String. Part of url to match (default "/") |
| defaultBehavior | *Required*. Type: String, "important" / "common" / "ignore". Describe what to do if none of exceptions matched. |
| exceptions | Type: Array<IRuleException>. Describe a specific action on response statuses (default []) |
    
IRuleException interface:
| Field | Description |
| --- | --- |
| statusCode | *Required*. Type: Number. Response status code to trigger. |
| behavior | *Required*. Type: String, "important" / "common" / "ignore". Response status action. |

# TODO
1) Different storage engines
2) Normal docs
