export default class {
    constructor(defaultTheme = "light") {
        this._value = null;
        this.update();
        this._default = defaultTheme;
    }
    update() {
        this._value = localStorage.getItem("theme");
        switch (this._value) {
            case "system":
                window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this._themeEventHandler);
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
        console.log(this.theme);
        switch (this.theme) {
            case "light":
                this.theme = "dark";
                break;
            case "dark":
                this.theme = "light";
                console.log(this.theme);
        }
    }
    _handleDom(theme) {
        document.body.removeAttribute("light");
        document.body.removeAttribute("dark");
        document.body.setAttribute(theme, "");
    }
    _themeEventHandler() {
        this.theme = this.systemTheme;
    }
    set theme(theme) {
        if (this._value === "system" && theme !== "system")
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this._themeEventHandler);
        localStorage.setItem("theme", theme ?? "system");
        this.update();
    }
    get theme() {
        switch (this._value) {
            case "light":
            case "dark":
                return this._value;
            case "system":
                return this.systemTheme;
            default:
                return this._default;
        }
    }
    get systemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)")
            ? "dark"
            : "light";
    }
}
