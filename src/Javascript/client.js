import { activeNotebook } from "./utils.js";
import { NavItem } from "./components/NavItem.js";
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

// Toggle "Create Note" buttons based on notebook existence
const toggleNoteCreateBtns = (hasNotebooks) => {
  noteCreateBtns.forEach(btn => 
    btn[hasNotebooks ? "removeAttribute" : "setAttribute"]("disabled", "")
  );
};

export const client = {
  notebook: {
    create(notebookData) {
      const { id, name } = notebookData;
      const navItem = NavItem(id, name);
      
      sidebarList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = name;
      notePanel.innerHTML = emptyNotesTemplate;
      toggleNoteCreateBtns(true);
    },

    read(notebookList) {
      toggleNoteCreateBtns(notebookList.length > 0);

      notebookList.forEach(({ id, name }, index) => {
        const navItem = NavItem(id, name);

        if (index === 0) {
          activeNotebook.call(navItem);
          notePanelTitle.textContent = name;
        }

        sidebarList.appendChild(navItem);
      });
    },

    update(notebookId, notebookData) {
      const { id, name } = notebookData;
      const oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
      const newNotebook = NavItem(id, name);

      notePanelTitle.textContent = name;
      sidebarList.replaceChild(newNotebook, oldNotebook);
      activeNotebook.call(newNotebook);
    },

    delete(notebookId) {
      const deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
      const nextActive = deletedNotebook.nextElementSibling ?? deletedNotebook.previousElementSibling;

      if (nextActive) {
        nextActive.click();
      } else {
        notePanelTitle.innerHTML = "";
        notePanel.innerHTML = "";
        toggleNoteCreateBtns(false);
      }

      deletedNotebook.remove();
    },
  },

  note: {
    create(noteData) {
      if (!notePanel.querySelector("[data-note]")) {
        notePanel.innerHTML = "";
      }
      notePanel.prepend(Card(noteData));
    },

    read(noteList) {
      notePanel.innerHTML = noteList.length 
        ? noteList.map(noteData => Card(noteData)).join("")
        : emptyNotesTemplate;
    },

    update(noteId, noteData) {
      const oldCard = document.querySelector(`[data-note="${noteId}"]`);
      const newCard = Card(noteData);
      notePanel.replaceChild(newCard, oldCard);
    },

    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note="${noteId}"]`).remove();
      if (!isNoteExists) {
        notePanel.innerHTML = emptyNotesTemplate;
      }
    },
  },
};
