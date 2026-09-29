// Applies the saved (or system) colour theme before first paint to avoid a
// flash of the wrong theme. Loaded as an external file because the CSP
// forbids inline scripts.
(function () {
  var theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch (e) {
    /* storage unavailable: fall back to the system setting */
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.toggle('dark', theme === 'dark');
})();
