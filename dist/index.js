export default class {
    constructor(defaultTheme = "light") {
        var _a;
        this._default = defaultTheme;
        this._value = (_a = localStorage.getItem("theme")) !== null && _a !== void 0 ? _a : this._default;
        this._query = window.matchMedia("(prefers-color-scheme: dark)");
        this._root = document.body;
        this.update();
    }
    update() {
        switch (this._value) {
            case "system":
                this._handleDom(this._systemTheme);
                break;
            case "light":
            case "dark":
                this._handleDom(this._value);
                break;
            default:
                localStorage.setItem("theme", "system");
        }
    }
    toggle() {
        this.theme = this.theme === "light"
            ? "dark"
            : "light";
    }
    _handleDom(theme) {
        this._root.removeAttribute("light");
        this._root.removeAttribute("dark");
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
        switch (this._value) {
            case "light":
            case "dark":
                return this._value;
            case "system":
                return this._systemTheme;
            default:
                return this._default;
        }
    }
    setRoot(root) {
        this._root = root;
    }
    get _systemTheme() {
        return (window === null || window === void 0 ? void 0 : window.matchMedia("(prefers-color-scheme: dark)"))
            ? "dark"
            : "light";
    }
}
