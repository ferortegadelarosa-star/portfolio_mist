/* Warm / Cold theme
   Loaded in <head> on every page so the saved theme is applied before the
   first paint (no flash). Any `.theme-toggle` button switches it, and the
   choice is remembered across pages and visits. Other scripts can listen to
   the `themechange` event (e.g. to repaint a canvas). */
(function () {
    var KEY = 'theme';
    var root = document.documentElement;

    function stored() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function current() {
        return root.getAttribute('data-theme') === 'cold' ? 'cold' : 'warm';
    }

    function syncButtons() {
        var cold = current() === 'cold';
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(cold));
            btn.setAttribute('aria-label', cold ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    function apply(theme) {
        // Brief class so colours ease between themes instead of snapping
        root.classList.add('theme-switching');
        if (theme === 'cold') root.setAttribute('data-theme', 'cold');
        else root.removeAttribute('data-theme');
        try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode */ }
        syncButtons();
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
        setTimeout(function () { root.classList.remove('theme-switching'); }, 700);
    }

    if (stored() === 'cold') root.setAttribute('data-theme', 'cold');

    document.addEventListener('DOMContentLoaded', function () {
        syncButtons();
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation(); // keep the menu open
                apply(current() === 'cold' ? 'warm' : 'cold');
            });
        });
    });
})();
