import { DeleteConfirmModal, NoteModal } from "./Modal.js";
import { getRelativeTime } from "../utils.js";
import { Tooltip } from "./Tooltip.js";
import { client } from "../client.js";
import { db } from "../db.js";

// Creates an HTML card element representing a note based on provided note data.
export const Card = ({ id, title, text, postedOn, notebookId }) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.note = id;

  const relativeTime = getRelativeTime(postedOn);

  card.innerHTML = `
      <h3 class="card-title text-title-medium">${title}</h3>
  
      <p class="card-text text-body-large">${text}</p>
  
      <div class="wrapper">
        <span class="card-time text-label-large">${relativeTime}</span>
  
        <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note" data-delete-btn>
          <span class="material-symbols-rounded" aria-hidden="true">delete</span>
  
          <div class="state-layer"></div>
        </button>
      </div>
  
      <div class="state-layer"></div>
    `;

  // Initialize tooltip
  Tooltip(card.querySelector("[data-tooltip]"));

  // Handle note editing
  const handleNoteEdit = () => {
    const modal = NoteModal(title, text, relativeTime);
    modal.open();

    modal.onSubmit((noteData) => {
      const updatedData = db.update.note(id, noteData);
      client.note.update(id, updatedData);
      modal.close();
    });
  };

  // Handle note deletion
  const handleNoteDelete = (event) => {
    event.stopImmediatePropagation();
    const modal = DeleteConfirmModal(title);
    modal.open();

    modal.onSubmit((isConfirm) => {
      if (isConfirm) {
        const existedNotes = db.delete.note(notebookId, id);
        client.note.delete(id, existedNotes.length);
      }
      modal.close();
    });
  };

  // Add event listeners
  card.addEventListener("click", handleNoteEdit);
  card.querySelector("[data-delete-btn]").addEventListener("click", handleNoteDelete);

  return card;
};
