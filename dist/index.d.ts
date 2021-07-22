export declare interface Options extends Record<"theme", unknown> {
}
export declare type LiteralOf<L, T> = T extends L ? T : never;
export declare type LiteralExtension<T> = (T & {});
declare type Theme = "light" | "dark" | LiteralOf<Options["theme"], string> | LiteralExtension<string>;
declare type ColorScheme = "system" | Theme;
export default class {
    private _value;
    private _default;
    private _query;
    private _root;
    private _themes;
    constructor(defaultTheme?: Theme, root?: Element);
    update(): void;
    toggle(): void;
    next(): void;
    private _domHandler;
    private _themeEventHandler;
    set theme(theme: ColorScheme);
    get theme(): ColorScheme;
    addThemes(name: Theme): void;
    set root(root: HTMLElement);
    private get _systemTheme();
    setVar(name: string, value: string | number): void;
    setVars(vars: Record<string, string | number>): void;
}
export {};
