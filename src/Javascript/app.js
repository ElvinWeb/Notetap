import {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { NoteModal } from "./components/Modal.js";
import { client } from "./client.js";
import { db } from "./db.js";

// DOM elements
const elements = {
  sidebarTogglers: document.querySelectorAll("[data-sidebar-toggler]"),
  currentDateElem: document.querySelector("[data-current-date]"),
  overlay: document.querySelector("[data-sidebar-overlay]"),
  tooltipElems: document.querySelectorAll("[data-tooltip]"),
  greetElem: document.querySelector("[data-greeting]"),
  sidebar: document.querySelector("[data-sidebar]"),
  sidebarList: document.querySelector("[data-sidebar-list]"),
  addNotebookBtn: document.querySelector("[data-add-notebook]"),
  noteCreateBtns: document.querySelectorAll("[data-note-create-btn]"),
};

// Initialize app
const initApp = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Setup sidebar toggle
  addEventOnElements(elements.sidebarTogglers, "click", () => {
    elements.sidebar.classList.toggle("active");
    elements.overlay.classList.toggle("active");
  });

  // Initialize tooltips
  elements.tooltipElems.forEach((elem) => Tooltip(elem));

  // Set greeting and date
  elements.greetElem.textContent = getGreetingMsg(currentHour);
  elements.currentDateElem.textContent = currentDate
    .toDateString()
    .replace(" ", ", ");
};

// Notebook functionality
const notebookManager = {
  createField() {
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");
    navItem.innerHTML = `
      <span class="text text-label-large" data-notebook-field></span>
      <div class="state-layer"></div>
    `;

    elements.sidebarList.appendChild(navItem);
    const navItemField = navItem.querySelector("[data-notebook-field]");

    activeNotebook.call(navItem);
    makeElemEditable(navItemField);
    navItemField.addEventListener("keydown", this.create);
  },

  create(event) {
    if (event.key === "Enter") {
      const notebookData = db.post.notebook(this.textContent || "Untitled");
      this.parentElement.remove();
      client.notebook.create(notebookData);
    }
  },

  renderExisting() {
    const notebookList = db.get.notebook();
    client.notebook.read(notebookList);
  },
};

// Note functionality
const noteManager = {
  handleCreate() {
    const modal = NoteModal();
    modal.open();

    modal.onSubmit((noteObj) => {
      const activeNotebookId = document.querySelector("[data-notebook].active")
        ?.dataset.notebook;
      const noteData = db.post.note(activeNotebookId, noteObj);
      client.note.create(noteData);
      modal.close();
    });
  },

  renderExisting() {
    const activeNotebookId = document.querySelector("[data-notebook].active")
      ?.dataset.notebook;
    if (activeNotebookId) {
      const noteList = db.get.note(activeNotebookId);
      client.note.read(noteList);
    }
  },
};

// Event listeners
elements.addNotebookBtn.addEventListener("click", () =>
  notebookManager.createField()
);
addEventOnElements(elements.noteCreateBtns, "click", noteManager.handleCreate);

// Initialize app
initApp();
notebookManager.renderExisting();
noteManager.renderExisting();
