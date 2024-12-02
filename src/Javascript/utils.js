// Attaches an event listener to a collection of DOM elements.
export const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

// Generates a greeting message based on the current hour of the day.
export const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";

  return `Good ${greeting}`;
};

let lastActiveNavItem;

// Activates a navigation item by adding the 'active' class and deactivates the previously active item.
export const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active"); // this: navItem
  lastActiveNavItem = this; // this: navItem
};

//  Makes a DOM element editable by setting the 'contenteditable' attribute to true and focusing on it.
export const makeElemEditable = function (element) {
  element.setAttribute("contenteditable", true);
  element.focus();
};
