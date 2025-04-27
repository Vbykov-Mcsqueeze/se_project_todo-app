class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this.name = data.name;
    this.completed = data.completed || false;
    this.templateSelector = templateSelector;
    this.handleCheck = handleCheck;
    this.handleDelete = handleDelete;
    this.data = data;
  }

  setEventListeners() {
    this.todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this.handleDelete(this);
      });

    this.todoElement
      .querySelector(".todo__completed")
      .addEventListener("change", () => {
        this._toggleCompletion();
        this.handleCheck(this);
      });
  }

  _toggleCompletion() {
    this.completed = !this.completed;
    this.todoElement.querySelector(".todo__completed").checked =
      this.completed;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this.data.completed;
    this._todoCheckboxEl.id = `todo-${this.data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this.data.id}`);
  }
  
  getView() {
    this.templateElement = document.querySelector(this.templateSelector);
    if (!this.templateElement) {
      console.error(`Template with selector ${this.templateSelector} not found`);
      return null;
  }
 
    this.todoElement = this.templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this.todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoDate = this.todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this.data.name;

    this.data.date = new Date(this.data.date);

    if (isNaN(this.data.date.getTime())) {
      this._todoDate.textContent = "";
    } else {
      this._todoDate.textContent = `${
        this.data.date.getMonth() + 1
      }/${this.data.date.getDate()}/${this.data.date.getFullYear()}`;
    }

    this._generateCheckboxEl();
    this.setEventListeners();

    return this.todoElement;
  }
}

export default Todo;