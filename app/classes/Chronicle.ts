
import express from "express";
import path from "path";

import Flash from "./Flash";
import HistoryQ from "./HistoryQ";

import IConfig from "../structs/IConfig";
import IApplication from "../structs/IApplication";
import IRequest from "../structs/IRequest";
import IResponse from "../structs/IResponse";
import INextFunction from "../structs/INextFunction";

// import { PageList } from "../ui/pages";

import { DEFAULT_CAPACITY, DEFAULT_ENDPOINT } from "../constanst";

export default class Chronicle {
    private config: IConfig;
    private historyQ: HistoryQ;

    constructor(expressApp: IApplication, config: IConfig = {}) {
        this.config = config;
        this.historyQ = new HistoryQ(this.config.capacity || DEFAULT_CAPACITY);
        expressApp.use(this.middleware);
        expressApp.use(config.endpoint || DEFAULT_ENDPOINT, express.static(path.join(__dirname, '..', 'ui')));
        expressApp.get(`${config.endpoint || DEFAULT_ENDPOINT}/api/history`, this.getIndexPage);
    }

    private middleware = (req: IRequest, res: IResponse, next: INextFunction) => {

        let excludeEp = this.config.endpoint || DEFAULT_ENDPOINT;
        // console.log(req.path, excludeEp, req.path.indexOf(excludeEp))
        if (req.path.indexOf(excludeEp) !== -1) {
            next();
            return;
        }

        req.flash = new Flash(this.historyQ);

        req.flash.setReq('method', req.method);
        req.flash.setReq('url', req.path);
        req.flash.setReq('query', req.query || {});
        req.flash.setReq('body', req.body || {});

        let _write = res.write;
        let _end = res.end;
        let chunks = [];

        res.write = function (chunk: any) {
            chunks.push(chunk);
            return _write.apply(res, arguments);
        };
        res.end = function (chunk: any) {
            if (chunk) chunks.push(chunk);
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
            req.flash.setRes('headers', { ...res.getHeaders() });

            req.flash.done();
        });
        next();
    }

    private getIndexPage = (req: any, res: IResponse) => {
        const { limit, offset } = req.query;
        let history = this.historyQ.get(limit, offset);
        res.json(history);
    }

    // private endpoint = (req: any, res: IResponse) => {
    //     const { limit, offset } = req.query;
    //     let history = this.historyQ.get(limit, offset);
    //     let rendered = PageList({ items: history });
    //     // let rendered = history.map(el => {
    //     //     return render(el);
    //     // })
    //     let html = rootPageTemplate.replace('{root}', rendered);
    //     res.send(html);
    // }
}
