type Theme = "light" | "dark" | string
type ColorScheme = "system" | Theme

export default class {
	private _value: ColorScheme
	private _default: Theme
	private _query: MediaQueryList
	private _root: Element
	private _themes: Array<Theme> = ["light", "dark"]

	constructor(defaultTheme: Theme = "light") {
		this._default = defaultTheme
		this._value = localStorage.getItem("theme") as ColorScheme ?? this._default
		this._query = window.matchMedia("(prefers-color-scheme: dark)")
		this._root  = document.documentElement as Element
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
		let idx = this._themes.indexOf(this.theme as Theme)
		this.theme = this._themes[idx]
	}


	/*
	 * HANDLERS
	 */
	private _domHandler(theme: Theme) {
		this._themes.forEach(theme => this._root.removeAttribute(theme))
		this._root.setAttribute(theme, "")
	}

	private _themeEventHandler() {
		this._value = this._systemTheme
	}

	set theme(theme: ColorScheme) {
		if (this._value !== "system" && theme === "system")
			this._query.addEventListener("change", this._themeEventHandler)
		else if (this._value === "system" && theme !== "system")
			this._query.removeEventListener("change", this._themeEventHandler)

		localStorage.setItem("theme", theme ?? "system")
		this._value = theme ?? "system"
		this.update()
	}

	get theme(): ColorScheme {
		if (this._themes.includes(<Theme>this._value))
			return this._value
		else if (this._value === "system")
			return this._systemTheme
		else
			return this._default
	}

	addThemes(name: Theme) {
		this._themes.push(name)
	}

	set root(root: Element) {
		this._root = root
	} 

	private get _systemTheme() {
		return window?.matchMedia("(prefers-color-scheme: dark)")
			? "dark"
			: "light"
	}

	/*
	 * CSS Custom Properties
	 */
	setVar(name: string, value: string) {
		(<HTMLElement>this._root).style.setProperty(`--${name}`, value)
	}

	setVars(obj: Record<string, string>) {
		for (const [name, value] of Object.entries(obj))
			this.setVar(name, value)

	}
}