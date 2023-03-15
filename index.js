class Input {
	constructor(element, wrapper, length) {
		this.element = document.querySelector(`#${element}`)
		this.wrapper = document.querySelector(`#${wrapper}`)
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

var existInvalidEntry = true
const main = document.querySelector("#main")

onload = () => {
	cardNameInput.init()
	cardNumberInput.init()
	cvcInput.init()
	monthInput.init()
	yearInput.init()
	confirmButton.init()
}

const confirmButton = {
	element: document.querySelector("#confirmButton"),
	init: function() {
		this.element.addEventListener("click", ev => {
			ev.preventDefault()
			monthInput.confirmEntry()
			yearInput.confirmEntry()
			cvcInput.confirmEntry()
			cardNameInput.confirmEntry()
			cardNumberInput.confirmEntry()

			if (!existInvalidEntry) {
				const registerScreen = document.querySelector(".register")
				registerScreen.style.animation = "opacityOut 0.5s ease backwards"
				registerScreen.addEventListener("animationend", () => {	
					main.setAttribute("data-current-screen", "finish")
				})
			}

		})
	}
}
const cardNameInput = {
	element: document.querySelector("#cardNameInput"),
	wrapper: document.querySelector("#nameInputWrapper"),
	chars: "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	init: function() {
		this.element.addEventListener("input", () => {
			this.updateErrorElement(!this.parseChars())
			if (this.parseChars()) {
				cardNameReference.updateElement(this.element.value)
				cardNameReference.checkEmpty()
			}
			if (this.element.length == "") {
				this.confirmEntry()
			}
		})
	},
	parseChars: function() {
		const inputValue = this.element.value
		const validEntry = inputValue.split("").every(char => this.chars.includes(char))
		if (validEntry) {
			return true
		}
		else {
			return false
		}
	},
	updateErrorElement: function(state) {
		if (state)
			this.wrapper.classList.add("error")
		else
			this.wrapper.classList.remove("error")
	},
	confirmEntry: function() {
		if (this.element.value == "") {
			this.updateErrorElement(true)
			existInvalidEntry = true
		} else if (this.element.value.split("").every(char => this.chars.includes(char))) {
			this.updateErrorElement(false)
			existInvalidEntry = false
		}
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
			this.checkEntry()
			cardNumberReference.updateElement(this.element.value)
			cardNumberReference.checkEmpty()


		})
	},
	updateErrorElement: function(state) {
		if (state)
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
	},
	checkEntry: function() {
		if (this.element.value.length < 19 && this.element.value.length > 0) {
			this.updateErrorElement(true)
			existInvalidEntry = true
			return true
		} else {
			this.updateErrorElement(false)
			existInvalidEntry = false
			return false
		}
	},
	confirmEntry: function() {
		if (this.element.value === "") {
			this.updateErrorElement(true)
			existInvalidEntry = true
		} else if (this.checkEntry()) {
			this.updateErrorElement(false)
			existInvalidEntry = false
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
const cardYearReference = {
	element: document.querySelector("#year"),
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
const cardCvcReference = {
	element: document.querySelector("#cvcReference"),
	default: "000",
	updateElement: function(value) {
		this.element.innerText = value

	},
	checkEmpty: function() {
		if (this.element.innerText.length < 1) {
			this.updateElement(this.default)
		}
	}
}
const cardNumberReference = {
	element: document.querySelector("#numberReference"),
	default: "0000 0000 0000 0000",
	updateElement: function(value) {
		this.element.innerText = value
	},
	checkEmpty: function() {
		if (this.element.innerText.length <= 0) {
			this.updateElement(this.default)
		}
	}
}

const cvcInput = new Input("cvcCodeInput", "cvcInputWrapper", 3)
cvcInput.init(function() {
	cvcInput.parseChars()
	cvcInput.checkEntry()
	cardCvcReference.updateElement(cvcInput.element.value)
	cardCvcReference.checkEmpty()
	if (cvcInput.element.value == "")
		cvcInput.confirmEntry()
})
cvcInput.checkEntry = function() {
	if (cvcInput.element.value < 99 && cvcInput.element.value.length > 0 && cvcInput.element.value[0] != 0) {
		cvcInput.wrapper.classList.add("error")
		existInvalidEntry = true
	} else if (cvcInput.element.value > 99){
		cvcInput.wrapper.classList.remove("error")
		existInvalidEntry = false
	}
}
cvcInput.confirmEntry = function() {
	if (cvcInput.element.value === "") {
		cvcInput.wrapper.classList.add("error")
		existInvalidEntry = true
	} else if (cvcInput.element.value > 99) {
		cvcInput.wrapper.classList.remove("error")
		existInvalidEntry = false
	}
}

const monthInput = new Input("expirationMonthInput", "mmYyWrapper", 2)
monthInput.limitMonth = function() {
	if (parseInt(monthInput.element.value) > 12) {
		monthInput.element.value = 12
	} else if (parseInt(monthInput.element.value) <= 0) {
		monthInput.element.value = 1
	}
}
monthInput.confirmEntry = function() {
	if (monthInput.element.value === "") {
		monthInput.wrapper.classList.add("error")
		existInvalidEntry = true
	} else {
		monthInput.wrapper.classList.remove("error")
		existInvalidEntry = false
	}
}
monthInput.init(function() {
	monthInput.parseChars()
	monthInput.limitMonth()
	monthInput.confirmEntry()
	cardMonthReference.updateElement(monthInput.element.value)
	cardMonthReference.checkEmpty()
})

const yearInput = new Input("expirationYearInput", "mmYyWrapper", 2)
yearInput.init(function() {
	yearInput.parseChars()
	yearInput.confirmEntry()
	cardYearReference.updateElement(yearInput.element.value)
	cardYearReference.checkEmpty()
})
yearInput.confirmEntry = function() {
	if (yearInput.element.value === "") {
		yearInput.wrapper.classList.add("error")
		existInvalidEntry = true
	} else {
		yearInput.wrapper.classList.remove("error")
		existInvalidEntry = false
	}
}
