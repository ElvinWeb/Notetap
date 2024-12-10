// Attaches an event listener to a collection of DOM elements.
const addEventOnElements = (elements, eventType, callback) =>
  elements.forEach((element) => element.addEventListener(eventType, callback));

// Generates a greeting message based on the current hour of the day.
const getGreetingMsg = (currentHour) => {
  const greetings = {
    0: "Night",
    5: "Morning",
    12: "Noon",
    15: "Afternoon",
    17: "Evening",
    20: "Night",
  };

  const hour = Object.keys(greetings)
    .reverse()
    .find((h) => currentHour >= h);

  return `Good ${greetings[hour]}`;
};

let lastActiveNavItem;

// Activates a navigation item by adding the 'active' class and deactivates the previously active item.
const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  lastActiveNavItem = this;
};

// Makes a DOM element editable by setting the 'contenteditable' attribute to true and focusing on it.
const makeElemEditable = (element) => {
  element.setAttribute("contenteditable", true);
  element.focus();
};

// Generates a unique ID based on the current timestamp.
const generateID = () => Date.now().toString();

// Finds a notebook in database by its ID.
const findNotebook = (db, notebookId) => db.notebooks.find((notebook) => notebook.id === notebookId);

// Finds the index of a notebook in an array of notebooks based on its ID.
const findNotebookIndex = (db, notebookId) => db.notebooks.findIndex((item) => item.id === notebookId);

// Converts a timestamp in milliseconds to a human-readable relative time string.
const getRelativeTime = (milliseconds) => {
  const elapsed = Date.now() - milliseconds;
  const minute = Math.floor(elapsed / 60000);
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
const findNote = (db, noteId) =>
  db.notebooks.reduce(
    (found, notebook) =>
      found || notebook.notes.find((note) => note.id === noteId),
    null
  );

// Finds the index of a note in a notebook's array of notes based on its ID.
const findNoteIndex = (notebook, noteId) =>
  notebook.notes.findIndex((note) => note.id === noteId);

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
