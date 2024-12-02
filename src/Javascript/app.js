import { addEventOnElements, getGreetingMsg } from "./utils.js";

const sidebarTogglers = document.querySelectorAll("[data-sidebar-toggler]");
const $currentDateElem = document.querySelector("[data-current-date]");
const overlay = document.querySelector("[data-sidebar-overlay]");
const tooltipElems = document.querySelectorAll("[data-tooltip]");
const greetElem = document.querySelector("[data-greeting]");
const sidebar = document.querySelector("[data-sidebar]");
const currentHour = new Date().getHours();

// Toggle sidebar in small screen
addEventOnElements(sidebarTogglers, "click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute
tooltipElems.forEach(($elem) => Tooltip($elem));

// Show greeting message on homepage
greetElem.textContent = getGreetingMsg(currentHour);

// Show current date on homepage
$currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");
