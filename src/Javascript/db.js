import {
  generateID,
  findNotebook,
  findNotebookIndex,
  findNote,
  findNoteIndex,
} from "./utils.js";

// Database state
let notekeeperDB = {};

/**
 * Initializes the database from localStorage or creates new if not exists
 */
const initDB = () => {
  try {
    const db = localStorage.getItem("notekeeperDB");
    notekeeperDB = db ? JSON.parse(db) : { notebooks: [] };
    if (!db) localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  } catch (err) {
    console.error("Failed to initialize database:", err);
    notekeeperDB = { notebooks: [] };
  }
};

// Database read/write operations
const readDB = () => {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

const writeDB = () => {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

initDB();

// CRUD operations for notebooks and notes
export const db = {
  post: {
    notebook(name) {
      readDB();
      const notebook = {
        id: generateID(),
        name,
        notes: [],
      };
      notekeeperDB.notebooks.push(notebook);
      writeDB();
      return notebook;
    },

    note(notebookId, noteData) {
      readDB();
      const notebook = findNotebook(notekeeperDB, notebookId);
      const note = {
        id: generateID(),
        notebookId,
        ...noteData,
        postedOn: Date.now(),
      };
      notebook.notes.unshift(note);
      writeDB();
      return note;
    },
  },

  get: {
    notebook() {
      readDB();
      return notekeeperDB.notebooks;
    },

    note(notebookId) {
      readDB();
      return findNotebook(notekeeperDB, notebookId).notes;
    },
  },

  update: {
    notebook(notebookId, name) {
      readDB();
      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;
      writeDB();
      return notebook;
    },

    note(noteId, updates) {
      readDB();
      const note = findNote(notekeeperDB, noteId);
      Object.assign(note, updates);
      writeDB();
      return note;
    },
  },

  delete: {
    notebook(notebookId) {
      readDB();
      const index = findNotebookIndex(notekeeperDB, notebookId);
      notekeeperDB.notebooks.splice(index, 1);
      writeDB();
    },

    note(notebookId, noteId) {
      readDB();
      const notebook = findNotebook(notekeeperDB, notebookId);
      const index = findNoteIndex(notebook, noteId);
      notebook.notes.splice(index, 1);
      writeDB();
      return notebook.notes;
    },
  },
};
