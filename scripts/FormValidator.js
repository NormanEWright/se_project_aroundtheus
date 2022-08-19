class FormValidator {

  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  // Show the error message
  _showInputError (formElement, inputElement) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = `${inputElement.validationMessage}`;
    errorMessageElement.classList.add(this._errorClass);
  };

  // Hide the error message
  _hideInputError (formElement, inputElement) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  };

  // Check the validity of input
  _checkInputValidity (formELement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formELement, inputElement);
    } else {
      this._hideInputError(formELement, inputElement);
    }
  };

  // Check if any of the inputs in list are invalid
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Disable the submit button
  _disableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  // Enable the submit button
  _enableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  // Control the submit button state
  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(submitButton, this._inactiveButtonClass);
    } else {
      this._enableButton(submitButton, this._inactiveButtonClass);
    };
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._toggleButtonState(inputList, submitButton);
        this._checkInputValidity(this._formElement, inputElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}

export default FormValidator;