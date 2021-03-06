"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Flash_1 = __importDefault(require("./Flash"));
const HistoryQ_1 = __importDefault(require("./HistoryQ"));
const constanst_1 = require("../constanst");
class Chronicle {
    constructor(expressApp, config = {}) {
        this.middleware = (req, res, next) => {
            let excludeEp = this.config.endpoint || constanst_1.DEFAULT_ENDPOINT;
            if (req.path.indexOf(excludeEp) !== -1) {
                next();
                return;
            }
            const { defaultRuleset = constanst_1.DEFAULT_RULESET, rules = [] } = this.config;
            let usingRuleset = Object.assign({}, defaultRuleset);
            for (let rule of rules) {
                let location = rule.location || '/';
                if (req.path.indexOf(location) !== -1) {
                    usingRuleset = Object.assign({}, rule);
                    break;
                }
            }
            req.flash = new Flash_1.default(this.historyQ, usingRuleset);
            req.flash.setReq('method', req.method);
            req.flash.setReq('url', req.path);
            req.flash.setReq('query', req.query || {});
            req.flash.setReq('body', req.body || {});
            let _write = res.write;
            let _end = res.end;
            let chunks = [];
            res.write = function (chunk) {
                chunks.push(chunk);
                return _write.apply(res, arguments);
            };
            res.end = function (chunk) {
                if (chunk)
                    chunks.push(chunk);
                if (chunk instanceof Buffer || chunk instanceof Uint8Array) {
                    res.body = Buffer.concat(chunks).toString('utf8');
                }
                else {
                    res.body = chunks.join('');
                }
                _end.apply(res, arguments);
            };
            res.on('finish', () => {
                req.flash.setRes('status', {
                    code: res.statusCode,
                    message: res.statusMessage
                });
                req.flash.setRes('body', res.body);
                req.flash.setRes('headers', Object.assign({}, res.getHeaders()));
                req.flash.done();
            });
            next();
        };
        this.getHistory = (req, res) => {
            const { limit, offset } = req.query;
            let history = this.historyQ.get(limit, offset);
            res.json(history);
        };
        this.getImportant = (req, res) => {
            const { limit, offset } = req.query;
            let history = this.historyQ.getImportant(limit, offset);
            res.json(history);
        };
        this.config = config;
        this.historyQ = new HistoryQ_1.default(this.config.capacity || constanst_1.DEFAULT_CAPACITY, this.config.importantCapacity || constanst_1.DEFAULT_IMPORTANT_CAPACITY);
        expressApp.use(this.middleware);
        expressApp.use(config.endpoint || constanst_1.DEFAULT_ENDPOINT, express_1.default.static(path_1.default.join(__dirname, '..', 'ui')));
        expressApp.get(`${config.endpoint || constanst_1.DEFAULT_ENDPOINT}/api/history`, this.getHistory);
        expressApp.get(`${config.endpoint || constanst_1.DEFAULT_ENDPOINT}/api/important`, this.getImportant);
    }
}
exports.default = Chronicle;
//# sourceMappingURL=Chronicle.js.map