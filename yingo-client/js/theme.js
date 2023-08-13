document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.className;

        if (currentTheme === 'dark-mode') {
            document.body.className = '';
            themeToggle.textContent = 'Dark Mode';
        } else {
            document.body.className = 'dark-mode';
            themeToggle.textContent = 'Light Mode';
        }
    });
});
