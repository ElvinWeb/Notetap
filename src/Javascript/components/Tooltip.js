/*
 * Attaches a tooltip behavior to a given DOM element.
 * When the element is hovered over, a tooltip with the specified content is displayed.
 * The tooltip is automatically positioned below the element.
 */
export const Tooltip = (element) => {
  // Create tooltip element once and reuse
  const tooltip = document.createElement("span");
  tooltip.classList.add("tooltip", "text-body-small");

  // Handler functions
  const showTooltip = () => {
    tooltip.textContent = element.dataset.tooltip;
    const { top, left, height, width } = element.getBoundingClientRect();

    // Set position using transform for better performance
    tooltip.style.cssText = `
      top: ${top + height + 4}px;
      left: ${left + width/2}px;
      transform: translate(-50%, 0);
    `;
    document.body.appendChild(tooltip);
  };

  const hideTooltip = () => tooltip.remove();

  // Add event listeners
  element.addEventListener("mouseenter", showTooltip);
  element.addEventListener("mouseleave", hideTooltip);

  // Cleanup function to remove listeners if needed
  return () => {
    element.removeEventListener("mouseenter", showTooltip);
    element.removeEventListener("mouseleave", hideTooltip); 
    tooltip.remove();
  };
};
