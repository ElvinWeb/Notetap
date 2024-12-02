import {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";

const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const currentDateElem = document.querySelector("[data-current-date]");
const overlay = document.querySelector("[data-sidebar-overlay]");
const tooltipElems = document.querySelectorAll("[data-tooltip]");
const greetElem = document.querySelector("[data-greeting]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarList = document.querySelector("[data-sidebar-list]");
const addNotebookBtn = document.querySelector("[data-add-notebook]");
const currentHour = new Date().getHours();

// Toggle sidebar in small screen
addEventOnElements(sidebarTogglers, "click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute
tooltipElems.forEach((elem) => Tooltip(elem));

// Show greeting message on homepage
greetElem.textContent = getGreetingMsg(currentHour);

// Show current date on homepage
currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");

// Notebook create field
/*
 * Shows a notebook creation field in the sidebar when the "Add Notebook" button is clicked.
 * The function dynamically adds a new notebook field element, makes it editable, and listens for
 * the 'Enter' key to create a new notebook when pressed.
 */
const showNotebookField = function () {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");

  navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>
    <div class="state-layer"></div>
  `;

  sidebarList.appendChild(navItem);

  const navItemField = navItem.querySelector("[data-notebook-field]");

  // Active new created notebook and deactive the last one.
  activeNotebook.call(navItem);

  // Make notebook field content editable and focus
  makeElemEditable(navItemField);

  // When user press 'Enter' then create notebook
  navItemField.addEventListener("keydown", createNotebook);
};

addNotebookBtn.addEventListener("click", showNotebookField);

/*
 * Create new notebook
 * Creates a new notebook when the 'Enter' key is pressed while editing a notebook name field.
 * The new notebook is stored in the database.
 */
const createNotebook = function (event) {
  if (event.key === "Enter") {
    // Store new created notebook in database
    const notebookData = db.post.notebook(this.textContent || "Untitled"); // this: navItemField
    this.parentElement.remove();

    // Render navItem
    client.notebook.create(notebookData);
  }
};