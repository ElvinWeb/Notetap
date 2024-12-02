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
