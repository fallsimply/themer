# **@fallsimply/themer**
install with `npm i -D @fallsimply/themer` or `yarn add -D @fallsimply/themer`

alternative to `prefers-color-scheme` media queries that allows using themes besides the native theme

sets an attribute on the body element - either `light` or `dark`

## **before / after**

### **before**
CSS:
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

### **after** 
CSS:
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

JS:
``` js
import Themer from @fallsimply/themer
window.themer = new Themer()
```