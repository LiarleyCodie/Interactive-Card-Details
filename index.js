class Input {
	constructor(element, length, type) {
		this.element = document.querySelector(`#${element}`)
		this.length = length
		this.type = type
	}
	init() {
		this.element.addEventListener("input", () => this.parseChars())
	}
	parseChars() {
		if (this.element.value.length > this.length)
			this.element.value = this.element.value.slice(0, this.length)

		const currentValue = this.element.value
		const newValue = currentValue.replace(/[^0-9]/g, "")
		this.element.value = newValue
		if (this.type === "month") {
			this.limitMonth()
		}
	}
	limitMonth() {
		if (parseInt(this.element.value) > 12) {
			this.element.value = 12
		} else if (parseInt(this.element.value) <= 0) {
			this.element.value = 1
		}
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
			this.updateErrorElement(this.checkEntry())
		})
	},
	checkEntry: function() {
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
		if (valueWithoutSpaces.length % 4 === 0 && currentValue.length < 19)
			this.element.value = currentValue + " "
	}
}
const cardNameReference = {
	element: document.querySelector("#nameReference")
}

const cvcInput = new Input("cvcCodeInput", 3)
const monthInput = new Input("expirationMonthInput", 2, "month")
const yearInput = new Input("expirationYearInput", 2)