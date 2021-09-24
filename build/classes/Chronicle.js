"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Flash_1 = __importDefault(require("./Flash"));
const HistoryQ_1 = __importDefault(require("./HistoryQ"));
const constanst_1 = require("../constanst");
class Chronicle {
    constructor(expressApp, config = {}) {
        this.middleware = (req, res, next) => {
            req.flash = new Flash_1.default(this.historyQ);
            req.flash.setReq('method', req.method);
            req.flash.setReq('url', req.path);
            req.flash.setReq('query', req.query || {});
            req.flash.setReq('body', req.body || {});
            let _json = res.json;
            res.json = (body) => {
                req.flash.setRes('body', body);
                _json.call(res, body);
                return res;
            };
            res.on('finish', () => {
                req.flash.setRes('status', {
                    code: res.statusCode,
                    message: res.statusMessage
                });
                req.flash.done();
            });
            next();
        };
        this.endpoint = (req, res) => {
            const { limit, offset } = req.query;
            let history = this.historyQ.get(limit, offset);
            let rendered = history.map(el => {
                return render(el);
            });
            let html = rootPageTemplate.replace('{root}', rendered.reverse().join(''));
            res.send(html);
        };
        this.config = config;
        this.historyQ = new HistoryQ_1.default(this.config.capacity || constanst_1.DEFAULT_CAPACITY);
        expressApp.use(this.middleware);
        expressApp.get(config.endpoint || constanst_1.DEFAULT_ENDPOINT, this.endpoint);
    }
}
exports.default = Chronicle;
//TODO
function render(obj) {
    return (`
        <div style="${styleColumn}">
            <div style="${styleRow}">
                <span>${obj.request.method} ${obj.request.url}</span>
                <span>${obj.response.status.code}</span>
            </div>
            <div style="${styleRow}">
                <span>${(new Date(obj.timestamp)).toLocaleString()}</span>
            </div>
            <div style="${styleRow}">
                <span>${obj.elapsed} ms</span>
            </div>
        </div>
    `);
}
const styleBody = `
    margin: 0; 
    padding: 0; 
`;
const styleRoot = `
    height: 100%;
    display: flex; 
    flex-wrap: wrap;
    padding: 20px 15%;
    background-color: aliceblue;
    justify-content: center;
`;
const styleColumn = `
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    width: 180px;
    height: 60px;
    background-color: white;
`;
const styleRow = `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const rootPageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronicle</title>
</head>
<body style="${styleBody}">
    <div style="${styleRoot}">
        {root}
    </div>
</body>
</html>`;
//# sourceMappingURL=Chronicle.js.map