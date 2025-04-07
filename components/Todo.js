class Todo {
    constructor(data, selector) {
      console.log(data);
      console.log(selector);
      this._data = data;
      this._templateElement = document.querySelector(selector);
    }
  
    _setEventListeners() {
      this._todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();
      });
  
      this._todoCheckboxEl.addEventListener("change", () => {
          this._data.completed = !this._data.completed;
          console.log(this._data.completed);
      });
    }
  
    _generateCheckboxEl() {
      this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoCheckboxEl.checked = this._data.completed;
      this._todoCheckboxEl.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }
  
    getView() {
      this._todoElement = this._templateElement.content
        .querySelector(".todo")
        .cloneNode(true);
  
      this._todoNameEl = this._todoElement.querySelector(".todo__name");
      this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoDate = this._todoElement.querySelector(".todo__date");
      this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  
      this._todoNameEl.textContent = this._data.name;
  
      this._data.date = new Date(this._data.date);
  
      if (isNaN(this._data.date.getTime())) {
        this._todoDate.textContent = "";
    } else {
        this._todoDate.textContent = `${this._data.date.getMonth() + 1}/${this._data.date.getDate()}/${this._data.date.getFullYear()}`;
    }
  
    this._generateCheckboxEl()
    this._setEventListeners()
  
    return this._todoElement;
    }
  }
  
  export default Todo;