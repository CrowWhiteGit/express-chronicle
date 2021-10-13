
import IRuleset from "./IRuleset";

export default interface IConfig {
    capacity?: number,
    importantCapacity?: number,
    endpoint?: string,
    defaultRuleset?: IRuleset,
    rules?: Array<IRuleset>
}
