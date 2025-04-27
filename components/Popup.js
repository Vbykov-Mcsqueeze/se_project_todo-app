class Popup {
    constructor({ popupSelector }) {
        this.popupElement = document.querySelector(popupSelector);
        this.popoupCloseBtn = this.popupElement.querySelector(".popup__close");
        this.handleEscapeClose = this._handleEscapeClose.bind(this);
    }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this.popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this.popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this.popupElement.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
            this.close();
        }
    });
}
}

export default Popup;