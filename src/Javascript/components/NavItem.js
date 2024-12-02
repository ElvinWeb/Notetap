import { Tooltip } from "./Tooltip.js";

const notePanelTitle = document.querySelector("[data-note-panel-title]");

/*
 * Creates a navigation item representing a notebook. This item displays the notebook's name, allows editing
 * and deletion of the notebook, and handles click events to display its associated notes.
 */
export const NavItem = function (id, name) {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.setAttribute("data-notebook", id);

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

  // Show tooltip on edit and delete button
  const tooltipElems = navItem.querySelectorAll("[data-tooltip]");
  tooltipElems.forEach(($elem) => Tooltip($elem));

  /*
   * Handles the click event on the navigation item. Updates the note panel's title, retrieves the associated notes,
   * and marks the item as active.
   */
  navItem.addEventListener("click", function () {
    notePanelTitle.textContent = name;
    activeNotebook.call(this);
  });

  return navItem;
};
