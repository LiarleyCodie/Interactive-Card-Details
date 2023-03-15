class Input {
	constructor(element, length) {
		this.element = document.querySelector(`#${element}`)
		this.length = length
	}
	init(callback) {
		this.element.addEventListener("input", (event) => {
			if (callback) callback(event)
		})
	}
	parseChars() {
		if (this.element.value.length > this.length)
			this.element.value = this.element.value.slice(0, this.length)

		const currentValue = this.element.value
		const newValue = currentValue.replace(/[^0-9]/g, "")
		this.element.value = newValue
	}
}

var existInvalidEntry = false

onload = () => {
	cardNameInput.init()
	cardNumberInput.init()
	cvcInput.init()
	monthInput.init()
	yearInput.init()
}

const cardNameInput = {
	element: document.querySelector("#cardNameInput"),
	wrapper: document.querySelector("#nameInputWrapper"),
	chars: "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	init: function() {
		this.element.addEventListener("input", () => {
			this.updateErrorElement(this.parseChars())
			if (this.parseChars()) {
				cardNameReference.updateElement(this.element.value)
				cardNameReference.checkEmpty()
			}
		})
	},
	parseChars: function() {
		const inputValue = this.element.value
		const validEntry = inputValue.split("").every(char => this.chars.includes(char))
		if (validEntry) {
			existInvalidEntry = false
			return true
		}
		else {
			existInvalidEntry = true
			return false
		}
	},
	updateErrorElement: function(state) {
		if (!state)
			this.wrapper.classList.add("error")
		else
			this.wrapper.classList.remove("error")
	}
}
const cardNumberInput = {
	element: document.querySelector("#cardNumberInput"),
	wrapper: document.querySelector("#cardNumberWrapper"),
	whiteSpaces: 0,
	init: function() {
		this.element.addEventListener("input", () => {
			if (this.element.value[0] == " ") {
				this.element.value = this.element.value.trimStart()
			} else {
				this.autoAddWhitespaces()
				if (this.element.value.length === 1 && this.element.value[0] == " ") {
					this.element.value = ""
				}
			}

			this.parseChars()
		})
	},
	updateErrorElement: function(state) {
		if (!state)
			this.wrapper.classList.add("error")
		else
			this.wrapper.classList.remove("error")
	},
	parseChars: function() {
		const currentValue = this.element.value
		const newValue = currentValue.replace(/[^0-9 ]/g, "")
		this.element.value = newValue
	},
	autoAddWhitespaces: function() {
		const currentValue = this.element.value
		const valueWithoutSpaces = currentValue.replace(/\s+/g, "")
		if (valueWithoutSpaces.length % 4 === 0 && currentValue.length < 19) {
			if (this.whiteSpaces < 4) {
				this.element.value = currentValue + " "
				this.whiteSpaces++
			} 
			if (currentValue.length <= 0) {
				this.whiteSpaces = 0
			}
		}
	}
}
const cardNameReference = {
	element: document.querySelector("#nameReference"),
	default: "JANE APPLESEED",
	updateElement: function(value) {
		this.element.innerText = value
	},
	checkEmpty: function() {
		if (this.element.innerText.length <= 0)
			this.element.innerText = this.default
	}
}
const cardMonthReference = {
	element: document.querySelector("#month"),
	default: "0",
	updateElement: function(value) {
		this.element.innerText = value < 10 ? "0" + value : value
		// console.log(charsLength)
	},
	checkEmpty: function() {
		if (this.element.innerText.length <= 1) {
			this.updateElement(this.default)
		}
	}
}

const cvcInput = new Input("cvcCodeInput", 3)
cvcInput.init(function() {
	cvcInput.parseChars()
})

const monthInput = new Input("expirationMonthInput", 2)
monthInput.limitMonth = function() {
	if (parseInt(monthInput.element.value) > 12) {
		monthInput.element.value = 12
	} else if (parseInt(monthInput.element.value) <= 0) {
		monthInput.element.value = 1
	}
}

monthInput.init(function() {
	monthInput.parseChars()
	monthInput.limitMonth()
	cardMonthReference.updateElement(monthInput.element.value)
	cardMonthReference.checkEmpty()
})
const yearInput = new Input("expirationYearInput", 2)

yearInput.init(function() {
	yearInput.parseChars()
})
