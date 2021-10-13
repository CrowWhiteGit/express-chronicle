import IConfig from "../structs/IConfig";
import IApplication from "../structs/IApplication";
export default class Chronicle {
    private config;
    private historyQ;
    constructor(expressApp: IApplication, config?: IConfig);
    private middleware;
    private getHistory;
    private getImportant;
}
