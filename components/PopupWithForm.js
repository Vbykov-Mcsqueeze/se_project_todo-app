import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this.handleFormSubmit = handleFormSubmit;
        this.popupForm = this.popupElement.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputList = this.popupForm.querySelectorAll('.popup__input');
        const values = {};
        inputList.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this.popupForm.reset();
    }
}

export default PopupWithForm;