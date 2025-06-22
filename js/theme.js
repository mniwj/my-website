console.log('theme.js loaded');
document.addEventListener('DOMContentLoaded', function() {
    // 支持页面有多个 theme-toggle 按钮
    const themeToggleBtns = document.querySelectorAll('#theme-toggle');
    const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon');
    const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggleLightIcons.forEach(icon => icon.classList.remove('hidden'));
            themeToggleDarkIcons.forEach(icon => icon.classList.add('hidden'));
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleLightIcons.forEach(icon => icon.classList.add('hidden'));
            themeToggleDarkIcons.forEach(icon => icon.classList.remove('hidden'));
            localStorage.setItem('theme', 'light');
        }
    }

    // 检查本地存储或系统偏好
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const preferredTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(preferredTheme);

    // 绑定所有切换按钮
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    });

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});