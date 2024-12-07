import { generateID, findNotebook, findNotebookIndex } from "./utils.js";

// DB Object
let notekeeperDB = {};

/*
 * Initializes a local database. If the data exists in local storage, it is loaded;
 * otherwise, a new empty database structure is created and stored.
 */
const initDB = function () {
  const db = localStorage.getItem("notekeeperDB");

  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

// Reads and loads the localStorage data in to the global variable `notekeeperDB`
const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

// Writes the current state of the global variable `notekeeperDB` to local storage
const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

/*
 * Collection of functions for performing CRUD (Create, Read, Update, Delete) operations on database.
 * The database state is managed using global variables and local storage.
 */

export const db = {
  post: {
    // Adds a new notebook to the database
    notebook(name) {
      readDB();

      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };

      notekeeperDB.notebooks.push(notebookData);

      writeDB();

      return notebookData;
    },

    // Adds a new note to a specified notebook in the database.
    note(notebookId, object) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);

      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime(),
      };

      notebook.notes.unshift(noteData);
      writeDB();

      return noteData;
    },
  },

  get: {
    //  Retrieves all notebooks from the database.
    notebook() {
      readDB();

      return notekeeperDB.notebooks;
    },

    // Retrieves all notes within a specified notebook.
    note(notebookId) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      return notebook.notes;
    },
  },

  update: {
    // Updates the name of a notebook in the database.
    notebook(notebookId, name) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
    },
  },

  delete: {
    // Deletes a notebook from the database.
    notebook(notebookId) {
      readDB();

      const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      notekeeperDB.notebooks.splice(notebookIndex, 1);

      writeDB();
    },
  },
};
