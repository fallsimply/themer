export declare interface Options extends Record<"theme", unknown> {}
export type LiteralOf<L, T> = T extends L ? T : never
export type LiteralExtension<T> = (T & {}) 

type Theme = "light" | "dark" | LiteralOf<Options["theme"], string> | LiteralExtension<string>
type ColorScheme = "system" | Theme

export default class {
	private _value:   ColorScheme
	private _default: Theme
	private _query:   MediaQueryList
	private _root:    HTMLElement
	private _themes:  Array<Exclude<ColorScheme, "system">> = ["light", "dark"]

	constructor(defaultTheme: Theme = "light", root: Element = document.documentElement) {
		this._default = defaultTheme
		this._value = localStorage.getItem("theme") as ColorScheme || this._default
		this._query = (!!window.matchMedia) 
			? window.matchMedia("(prefers-color-scheme: dark)")
			: null
		this._root = root as HTMLElement
		this.update()
	}

	update() {
		if (this._value === "system")
			this._domHandler(this._systemTheme)
		else if (this._themes.includes(this._value))
			this._domHandler(this._value)
		else
			this.theme = "system"
	}

	toggle() {
		this.theme = this.theme === "light" 
			? "dark"
			: "light"
	}

	next() {
		let idx = this._themes.indexOf(this.theme) + 1
		this.theme = this._themes[idx] || this._themes[0]
	}

	/*
	 * HANDLERS
	 */
	private _domHandler(theme: Theme) {
		if (!this._root.hasAttribute(theme)) {
			this._themes.forEach(theme => this._root.removeAttribute(theme))
			this._root.setAttribute(theme, "")
		}
	}

	private _themeEventHandler() {
		this._value = this._systemTheme
	}

	set theme(theme: ColorScheme) {
		if(!!this._query) {
			if (this._value !== theme && theme === "system")
				this._query.addEventListener("change", this._themeEventHandler)
			else if (this._value === theme && theme !== "system")
				this._query.removeEventListener("change", this._themeEventHandler)
		}

		localStorage.setItem("theme", theme || "system")
		this._value = theme || "system"
		this.update()
	}

	get theme(): ColorScheme {
		return this._value === "system"
			? this._systemTheme
			: this._value
	}

	addThemes(name: Theme) {
		this._themes.push(name)
	}

	set root(root: HTMLElement) {
		this._root = root
	} 

	private get _systemTheme() {
		return !!this._query
			? this._query.matches
				? "dark"
				: "light"
			: this._default
	}

	/*
	 * CSS Custom Properties
	 */
	setVar(name: string, value: string | number) {
		this._root.style.setProperty(`--${name}`, "" + value)
	}

	setVars(vars: Record<string, string | number>) {
		for (const [k, v] of Object.entries(vars))
			this.setVar(k, v)
	}
}