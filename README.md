# express-chronicle

Status: Work in progress

Inspired by Silk. This is a module for express.js for logging request-response history and showing it in web interface.
Can be configured to log or ignore specific endpoints, separate critical responses from expected.

Install with:
`npm i --save CrowWhiteGit/express-chronicle#1.0.1`

Example:
```javacsript
const express = require('express');
const app = express();

const { Chronicle, IConfig } = require('express-chronicle');

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
| endpoint | type: String. Location of UI (default /chronicle) |
| capacity | type: Number. Number of requests stored in common queue (default 100) |
| importantCapacity | type: Number. Number of requests stored in important queue (default 200) |
| defaultRuleset | type: IRuleset. Change default configuration for all locations. (default behavior 'common') |
| rules | type: Array[IRuleset]. Array of rules for specific locations. (default []) |
    
IRuleset interface:
| Field | Description |
| --- | --- |
| location | Type: String. Part of url to match (default "/") |
| defaultBehavior | *Required*. Type: String, "important" / "common" / "ignore". Describe what to do if none of exceptions matched. |
| exceptions | Type: Array[IRuleException]. Describe a specific action on response statuses (default []) |
    
IRuleException interface:
| Field | Description |
| --- | --- |
| statusCode | *Required*. Type: Number. Response status code to trigger. |
| behavior | *Required*. Type: String, "important" / "common" / "ignore". Response status action. |

# TODO
1) Different storing engines;
2) Pagination;
3) Config directory and environments;
4) Possibility to set a password on UI;
5) Methods to set extra data like db queries into flash;
6) Exceptions for elapsed time;
7) UI different cards for request methods and statuses, add filters
