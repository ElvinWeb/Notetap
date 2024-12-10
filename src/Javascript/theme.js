const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};
const rootElement = document.documentElement;

// Manages theme toggling and initialization
const toggleTheme = () => {
  const currentTheme = rootElement.getAttribute('data-theme') || THEMES.LIGHT;
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

  rootElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};

// Initialize theme based on stored preference or system setting
const initialTheme = localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT);
rootElement.setAttribute('data-theme', initialTheme);

// Set up theme toggle button
window.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.querySelector('[data-theme-btn]');
  themeBtn?.addEventListener('click', toggleTheme);
});
