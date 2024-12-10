import { DeleteConfirmModal } from "./Modal.js";
import { makeElemEditable, activeNotebook } from "../utils.js";
import { Tooltip } from "./Tooltip.js";
import { client } from "../client.js";
import { db } from "../db.js";

const notePanelTitle = document.querySelector("[data-note-panel-title]");

/*
 * Creates a navigation item representing a notebook with editing, deletion and note display functionality
 */
export const NavItem = (id, name) => {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.dataset.notebook = id;

  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field>${name}</span>

    <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
      <span class="material-symbols-rounded" aria-hidden="true">edit</span>
      <div class="state-layer"></div>
    </button>

    <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
      <span class="material-symbols-rounded" aria-hidden="true">delete</span>
      <div class="state-layer"></div>
    </button>

    <div class="state-layer"></div>
  `;

  // Cache DOM queries
  const navItemField = navItem.querySelector("[data-notebook-field]");
  const navItemEditBtn = navItem.querySelector("[data-edit-btn]");
  const navItemDeleteBtn = navItem.querySelector("[data-delete-btn]");

  // Initialize tooltips
  navItem.querySelectorAll("[data-tooltip]").forEach(Tooltip);

  // Event handlers
  const handleNavClick = () => {
    notePanelTitle.textContent = name;
    activeNotebook.call(navItem);
    client.note.read(db.get.note(id));
  };

  const handleFieldKeydown = (event) => {
    if (event.key === "Enter") {
      navItemField.removeAttribute("contenteditable");
      const updatedData = db.update.notebook(id, navItemField.textContent);
      client.notebook.update(id, updatedData);
    }
  };

  const handleDelete = () => {
    const modal = DeleteConfirmModal(name);
    modal.open();
    modal.onSubmit((isConfirm) => {
      if (isConfirm) {
        db.delete.notebook(id);
        client.notebook.delete(id);
      }
      modal.close();
    });
  };

  // Add event listeners
  navItem.addEventListener("click", handleNavClick);
  navItemEditBtn.addEventListener("click", () => makeElemEditable(navItemField));
  navItemField.addEventListener("keydown", handleFieldKeydown);
  navItemDeleteBtn.addEventListener("click", handleDelete);

  return navItem;
};
