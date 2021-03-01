declare type themes = "light" | "dark";
declare type mode = "system" | themes | null;
export default class {
    _value: mode;
    _default: themes;
    constructor(defaultTheme?: themes);
    update(): void;
    toggle(): void;
    _handleDom(theme: themes): void;
    _themeEventHandler(): void;
    set theme(theme: mode);
    get theme(): mode;
    get systemTheme(): "light" | "dark";
}
export {};
