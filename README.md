# **@fallsimply/themer**
install with `npm i -D @fallsimply/themer` or `yarn add -D @fallsimply/themer`

alternative to `prefers-color-scheme` media queries that allows using themes besides the native theme

sets an attribute on the body element - either `light` or `dark`

# breaking changes
version 2 uses the document's `html` element as the root instead of the `body` element 

# **before / after**

## **before**
### CSS
``` css
main {
	color: black;
	background: white;
}
@media (prefers-color-scheme: dark) {
	main {
		color: white;
		background: black;
	}
}
```
### CSS Variables
``` css
:root {
	--link: #00f;
}
@media (prefers-color-scheme: dark) {
	:root[dark] {
		--link: #f0f;
	}
}
```

## **after** 
### CSS
``` css
main {
	color: black;
	background: white;
}

[dark] main {
	
	color: white;
	background: black;
}
```

### CSS with Variables
``` css
:root {
	--link: #00f;
}

:root[dark] {
	--link: #f0f;
}
```

### JS
``` js
import Themer from @fallsimply/themer
window.themer = new Themer()
```