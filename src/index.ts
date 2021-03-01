type themes = "light" | "dark"
type mode = "system" | themes | null

export default class {
	_value: mode
	_default: themes

	constructor(defaultTheme: themes = "light") {
		this._value = null
		this.update()
		this._default = defaultTheme
	}

	update() {
		this._value = localStorage.getItem("theme") as mode
		switch (this._value) {
			case "system":
				window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this._themeEventHandler)
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
		console.log(this.theme)
		switch (this.theme) {
			case "light":
				this.theme = "dark"
				break
			case "dark":
				this.theme = "light"
				console.log(this.theme)
		}
	}
	

	_handleDom(theme: themes) {
		document.body.removeAttribute("light")
		document.body.removeAttribute("dark")
		document.body.setAttribute(theme, "")
	}

	_themeEventHandler() {
		this.theme = this.systemTheme
	}

	set theme(theme: mode) {
		if (this._value === "system" && theme !== "system")
			window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this._themeEventHandler)

		localStorage.setItem("theme", theme ?? "system")
		this.update()
	}

	get theme(): mode {
		switch (this._value) {
			case "light":
			case "dark":
				return this._value
			case "system":
				return this.systemTheme
			default:
				return this._default
		}
	}

	get systemTheme() {
		return window.matchMedia("(prefers-color-scheme: dark)") 
			? "dark"
			: "light"
	}


}