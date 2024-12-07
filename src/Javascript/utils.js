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

// Converts a timestamp in milliseconds to a human-readable relative time string.
const getRelativeTime = function (milliseconds) {
  const currentTime = new Date().getTime();
  const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day} day ago`;
};

// Finds a specific note by its ID within a database of notebooks and their notes.
const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }
  return note;
};

// Finds the index of a note in a notebook's array of notes based on its ID.
const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id === noteId);
};

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNoteIndex,
  findNote,
};
