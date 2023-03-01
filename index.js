// Header Cards
// Card frontside
const numberReferenceEl = document.querySelector("#numberReference")
const nameReferenceEl = document.querySelector("#nameReference")
const expDateReferenceEl = document.querySelector("#expDateReference")

// Card backside
const cvcReferenceEl = document.querySelector("#cvcReference")

// Form Inputs
const nameInputEl = document.querySelector("#cardName")
const numberInputEl = document.querySelector("#cardNumber")
const monthInputEl = document.querySelector("#expirationMonth")
const yearInputEl = document.querySelector("#expirationYear")
const cvcInputEl = document.querySelector("#cvcCode")
const confirmButtonEl = document.querySelector("#confirmButton")

confirmButtonEl.onclick = ev => ev.preventDefault()