declare type themes = "light" | "dark";
declare type mode = "system" | themes;
export default class {
    private _value?;
    private _default;
    private _query;
    private _root;
    constructor(defaultTheme?: themes);
    update(): void;
    toggle(): void;
    private _handleDom;
    private _themeEventHandler;
    set theme(theme: mode);
    get theme(): mode;
    private get _systemTheme();
}
export {};
