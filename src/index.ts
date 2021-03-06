type themes = "light" | "dark"
type mode = "system" | themes

export default class {
	private _value?: mode
	private _default: themes
	private _query: MediaQueryList
	private _root: Element

	constructor(defaultTheme: themes = "light") {
		console.log(this)
		this.update()
		this._default = defaultTheme
		this._value = localStorage.getItem("theme") as mode ?? this._default
		this._query = window.matchMedia("(prefers-color-scheme: dark)")
		this._root = document.body as Element
	}

	update() {
		switch (this._value) {
			case "system":
				this._handleDom(this._systemTheme)
				break
			case "light":
			case "dark":
				this._handleDom(this._value)
				break
			default:
				localStorage.setItem("theme", "system")
		}
	}

	toggle() {
		this.theme = this.theme === "light" 
			? "dark"
			: "light"
	}


	private _handleDom(theme: themes) {
		this._root.removeAttribute("light")
		this._root.removeAttribute("dark")
		this._root.setAttribute(theme, "")
	}

	private _themeEventHandler() {
		this._value = this._systemTheme
	}

	set theme(theme: mode) {
		if (this._value !== "system" && theme === "system")
			this._query.addEventListener("change", this._themeEventHandler)
		else if (this._value === "system" && theme !== "system")
			this._query.removeEventListener("change", this._themeEventHandler)

		localStorage.setItem("theme", theme ?? "system")
		this.update()
	}

	get theme(): mode {
		switch (this._value) {
			case "light":
			case "dark":
				return this._value
			case "system":
				return this._systemTheme
			default:
				return this._default
		}
	}

	setRoot(root: Element) {
		this._root = root
	} 

	private get _systemTheme() {
		return window?.matchMedia("(prefers-color-scheme: dark)")
			? "dark"
			: "light"
	}
}