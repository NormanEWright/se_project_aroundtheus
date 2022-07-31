// console.log("Connected!"); 

// Show the error message
const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = `${inputElement.validationMessage}`;
  errorMessageElement.classList.add(errorClass);
};

// Hide the error message
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
};

// Check the validity of input
const checkInputValidity = (formELement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formELement, inputElement, options);
  } else {
    hideInputError(formELement, inputElement, options);
  }
};

// Check if any of the inputs in list are invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Disable the submit button
const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

// Enable the submit button
const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// Control the submit button state
const toggleButtonState = (inputList, submitButton, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  };
};

// Handle the user input for each form
const setEventListeners = (formElement, options) => {
  const {inputSelector} = options;
  const {submitButtonSelector} = options;
  // Find all fields in the form, create an array using Array.from()
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Get the submit button for the form
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButton, options);
  
  // Iterate over the list of input fields
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", (evt) => {
      toggleButtonState(inputList, submitButton, options);
      // Call the checkInputValidity() function, pass the form and input element to be checked as arguments
      checkInputValidity(formElement, inputElement, options);
    });
  });
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Handle the user input for each form
const enableValidation = (options) => {
  const {formSelector} = options;
  const formList = [...document.querySelectorAll(formSelector)];
  // Iterate over the form list
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Cancel default form behavior for each form
      evt.preventDefault();
    });
    // Call the setEventListeners() function for each form, pass formELement as an argument
    setEventListeners(formElement, options);
  });
};

enableValidation(config);