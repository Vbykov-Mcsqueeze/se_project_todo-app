class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputEl, errorMessage) {
        inputEl.classList.add(this._inputErrorClass);
        const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        errorEl.textContent = errorMessage;
        errorEl.classList.add(this._errorClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
           } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
           }
    }

       resetValidation() {
        this._formEl.reset();

        this._toggleButtonState(); 
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage
            );
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _setEventListeners() {
         this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );

          this._submitButton = this._formEl.querySelector(this._submitButtonSelector);

          this._toggleButtonState();

          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
          });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            this.resetValidation();
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;