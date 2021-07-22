export default class {
    constructor(defaultTheme = "light", root = document.documentElement) {
        this._themes = ["light", "dark"];
        this._default = defaultTheme;
        this._value = localStorage.getItem("theme") || this._default;
        this._query = (!!window.matchMedia)
            ? window.matchMedia("(prefers-color-scheme: dark)")
            : null;
        this._root = root;
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
        let idx = this._themes.indexOf(this.theme) + 1;
        this.theme = this._themes[idx] || this._themes[0];
    }
    /*
     * HANDLERS
     */
    _domHandler(theme) {
        if (!this._root.hasAttribute(theme)) {
            this._themes.forEach(theme => this._root.removeAttribute(theme));
            this._root.setAttribute(theme, "");
        }
    }
    _themeEventHandler() {
        this._value = this._systemTheme;
    }
    set theme(theme) {
        if (!!this._query) {
            if (this._value !== theme && theme === "system")
                this._query.addEventListener("change", this._themeEventHandler);
            else if (this._value === theme && theme !== "system")
                this._query.removeEventListener("change", this._themeEventHandler);
        }
        localStorage.setItem("theme", theme || "system");
        this._value = theme || "system";
        this.update();
    }
    get theme() {
        return this._value === "system"
            ? this._systemTheme
            : this._value;
    }
    addThemes(name) {
        this._themes.push(name);
    }
    set root(root) {
        this._root = root;
    }
    get _systemTheme() {
        return !!this._query
            ? this._query.matches
                ? "dark"
                : "light"
            : this._default;
    }
    /*
     * CSS Custom Properties
     */
    setVar(name, value) {
        this._root.style.setProperty(`--${name}`, "" + value);
    }
    setVars(vars) {
        for (const [k, v] of Object.entries(vars))
            this.setVar(k, v);
    }
}
