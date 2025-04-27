import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import formValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
      const date = new Date(values.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const todoData = { 
          name: values.name, 
          date, 
          id 
      };
      section.addItem(todoData);
      addTodoPopup.close();
      todoCounter.updateTotal(true);
  }
});
addTodoPopup.setEventListeners();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    // find the currently opened modal
    // and close it
  }
}

function handleDelete(todoInstance) {
  if (todoInstance.completed) {
      todoCounter.updateCompleted(false);
  }

  todoCounter.updateTotal(false);

  todoInstance.todoElement.remove();
}

function handleCheck(todoInstance) {
  todoCounter.updateCompleted(todoInstance.completed);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: ".todos__list"
});

section.renderItems();

const newTodoValidator = new formValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
