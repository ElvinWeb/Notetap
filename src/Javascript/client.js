import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const sidebarList = document.querySelector("[data-sidebar-list]");
const notePanelTitle = document.querySelector("[data-note-panel-title]");
const notePanel = document.querySelector("[data-note-panel]");
const noteCreateBtns = document.querySelectorAll("[data-note-create-btn]");
const emptyNotesTemplate = `
<div class="empty-notes">
  <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>

  <div class="text-headline-small">No notes</div>
</div>
`;

// Enables or disables "Create Note" buttons based on whether there are any notebooks.
const disableNoteCreateBtns = function (isThereAnyNotebook) {
  noteCreateBtns.forEach((item) => {
    item[isThereAnyNotebook ? "removeAttribute" : "setAttribute"](
      "disabled",
      ""
    );
  });
};

/*
 * The client object manages interactions with the user interface (UI) to create, read, update, and delete notebooks and notes.
 * It provides functions for performing these operations and updating the UI accordingly.
 */

export const client = {
  notebook: {
    // Creates a new notebook in the UI, based on provided notebook data.
    create(notebookData) {
      const navItem = NavItem(notebookData.id, notebookData.name);
      sidebarList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
      notePanel.innerHTML = emptyNotesTemplate;
      disableNoteCreateBtns(true);
    },

    //  Reads and displays a list of notebooks in the UI.
    read(notebookList) {
      disableNoteCreateBtns(notebookList.length);

      notebookList.forEach((notebookData, index) => {
        const navItem = NavItem(notebookData.id, notebookData.name);

        if (index === 0) {
          activeNotebook.call(navItem);
          notePanelTitle.textContent = notebookData.name;
        }

        sidebarList.appendChild(navItem);
      });
    },

    // Updates the UI to reflect changes in a notebook.
    update(notebookId, notebookData) {
      const oldNotebook = document.querySelector(
        `[data-notebook="${notebookId}"`
      );
      const newNotebook = NavItem(notebookData.id, notebookData.name);

      notePanelTitle.textContent = notebookData.name;
      sidebarList.replaceChild(newNotebook, oldNotebook);
      activeNotebook.call(newNotebook);
    },

    // Deletes a notebook from the UI.
    delete(notebookId) {
      const deletedNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      );
      const activeNavItem =
        deletedNotebook.nextElementSibling ??
        deletedNotebook.previousElementSibling;

      if (activeNavItem) {
        activeNavItem.click();
      } else {
        notePanelTitle.innerHTML = "";
        notePanel.innerHTML = "";
        disableNoteCreateBtns(false);
      }

      deletedNotebook.remove();
    },
  },

  note: {
    // Creates a new note card in the UI based on provided note data.
    create(noteData) {
      // Clear 'emptyNotesTemplate' from 'notePanel' if there is no note exists
      if (!notePanel.querySelector("[data-note]")) notePanel.innerHTML = "";

      // Append card in notePanel
      const card = Card(noteData);
      notePanel.prepend(card);
    },

    // Reads and displays a list of notes in the UI.
    read(noteList) {
      if (noteList.length) {
        notePanel.innerHTML = "";

        noteList.forEach((noteData) => {
          const card = Card(noteData);
          notePanel.appendChild(card);
        });
      } else {
        notePanel.innerHTML = emptyNotesTemplate;
      }
    },
  },
};
