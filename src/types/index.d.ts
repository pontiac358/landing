declare module '*.svg';
declare module '*.jpg';
declare module '*.png';
declare module '*.md' {
    const value: string;
    export default value;
}
declare module '*.mdx' {
    const value: string;
    export default value;
}
declare module '*.yaml' {
    const value: object;
    export default value;
}
declare module '*.yml' {
    const value: object;
    export default value;
}

interface WebpackRequireContext {
    keys(): string[];
    <T = unknown>(id: string): T;
    resolve(id: string): string;
    id: string;
}

interface NodeRequire {
    context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): WebpackRequireContext;
}
