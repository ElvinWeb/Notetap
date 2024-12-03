// Attaches an event listener to a collection of DOM elements.
const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

// Generates a greeting message based on the current hour of the day.
const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";

  return `Good ${greeting}`;
};

let lastActiveNavItem;

// Activates a navigation item by adding the 'active' class and deactivates the previously active item.
const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active"); // this: navItem
  lastActiveNavItem = this; // this: navItem
};

//  Makes a DOM element editable by setting the 'contenteditable' attribute to true and focusing on it.
const makeElemEditable = function (element) {
  element.setAttribute("contenteditable", true);
  element.focus();
};

// Generates a unique ID based on the current timestamp.
const generateID = function () {
  return new Date().getTime().toString();
};

// Finds a notebook in database by its ID.
const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id === notebookId);
};

// Finds the index of a notebook in an array of notebooks based on its ID.
const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex((item) => item.id === notebookId);
};

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
};
