export declare interface Options extends Record<string, string> {
}
declare type Theme = "light" | "dark" | Options["themes"];
declare type ColorScheme = "system" | Theme;
export default class {
    private _value;
    private _default;
    private _query;
    private _root;
    private _themes;
    constructor(defaultTheme?: Theme);
    update(): void;
    toggle(): void;
    next(): void;
    private _domHandler;
    private _themeEventHandler;
    set theme(theme: ColorScheme);
    get theme(): ColorScheme;
    addThemes(name: Theme): void;
    set root(root: Element);
    private get _systemTheme();
    setVar(name: string, value: string): void;
    setVars(obj: Record<string, string>): void;
}
export {};
