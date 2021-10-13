interface IRuleException {
    statusCode: number;
    behavior: "important" | "common" | "ignore";
}
export default interface IRuleset {
    location?: string;
    defaultBehavior: "important" | "common" | "ignore";
    exceptions?: Array<IRuleException>;
}
export {};
