export default class {
    constructor(defaultTheme = "light") {
        var _a;
        this._themes = ["light", "dark"];
        this._default = defaultTheme;
        this._value = (_a = localStorage.getItem("theme")) !== null && _a !== void 0 ? _a : this._default;
        this._query = window.matchMedia("(prefers-color-scheme: dark)");
        this._root = document.documentElement;
        this.update();
    }
    update() {
        if (this._value === "system")
            this._domHandler(this._systemTheme);
        else if (this._themes.includes(this._value))
            this._domHandler(this._value);
        else
            this.theme = "system";
    }
    toggle() {
        this.theme = this.theme === "light"
            ? "dark"
            : "light";
    }
    next() {
        let idx = this._themes.indexOf(this.theme);
        this.theme = this._themes[idx];
    }
    /*
     * HANDLERS
     */
    _domHandler(theme) {
        this._themes.forEach(theme => this._root.removeAttribute(theme));
        this._root.setAttribute(theme, "");
    }
    _themeEventHandler() {
        this._value = this._systemTheme;
    }
    set theme(theme) {
        if (this._value !== "system" && theme === "system")
            this._query.addEventListener("change", this._themeEventHandler);
        else if (this._value === "system" && theme !== "system")
            this._query.removeEventListener("change", this._themeEventHandler);
        localStorage.setItem("theme", theme !== null && theme !== void 0 ? theme : "system");
        this._value = theme !== null && theme !== void 0 ? theme : "system";
        this.update();
    }
    get theme() {
        if (this._themes.includes(this._value))
            return this._value;
        else if (this._value === "system")
            return this._systemTheme;
        else
            return this._default;
    }
    addThemes(name) {
        this._themes.push(name);
    }
    set root(root) {
        this._root = root;
    }
    get _systemTheme() {
        return (window === null || window === void 0 ? void 0 : window.matchMedia("(prefers-color-scheme: dark)"))
            ? "dark"
            : "light";
    }
    /*
     * CSS Custom Properties
     */
    setVar(name, value) {
        this._root.style.setProperty(`--${name}`, value);
    }
    setVars(obj) {
        for (const [name, value] of Object.entries(obj))
            this.setVar(name, value);
    }
}
