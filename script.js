const root = document.documentElement;
const themeButtons = document.querySelectorAll('[data-set-theme]');

function setTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  root.dataset.theme = selected;
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setTheme === selected));
  });
}

// A new visitor always starts in light mode, regardless of system preference.
try {
  setTheme(localStorage.getItem('cv-theme'));
} catch {
  setTheme('light');
}

document.querySelector('.theme-controls').hidden = false;
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.setTheme;
    setTheme(theme);
    try {
      localStorage.setItem('cv-theme', theme);
    } catch {
      // Controls still work when browser storage is unavailable.
    }
  });
});

const printButton = document.querySelector('.print-link');
printButton.hidden = false;
printButton.addEventListener('click', () => window.print());
