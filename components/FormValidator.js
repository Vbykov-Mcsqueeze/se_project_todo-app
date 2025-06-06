class FormValidator {
    constructor(settings, formEl) {
        this.inputSelector = settings.inputSelector;
        this.formSelector = settings.formSelector;
        this.submitButtonSelector = settings.submitButtonSelector;
        this.errorClass = settings.errorClass;
        this.inputErrorClass = settings.inputErrorClass;
        this.inactiveButtonClass = settings.inactiveButtonClass;
        this.formEl = formEl;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _hideInputError(inputElement) {
        const errorElement = this.formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputEl, errorMessage) {
        inputEl.classList.add(this.inputErrorClass);
        const errorEl = this.formEl.querySelector(`#${inputEl.id}-error`);
        errorEl.textContent = errorMessage;
        errorEl.classList.add(this.errorClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this.inactiveButtonClass);
            this._submitButton.disabled = true;
           } else {
            this._submitButton.classList.remove(this.inactiveButtonClass);
            this._submitButton.disabled = false;
           }
    }
    
    resetValidation() {
        this.formEl.reset();

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
            this.formEl.querySelectorAll(this.inputSelector),
          );

          this._submitButton = this.formEl.querySelector(this.submitButtonSelector);

          this._toggleButtonState();

          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
          });
    }

    enableValidation() {
        this.formEl.addEventListener("submit", (evt) => {
            this.resetValidation();
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;