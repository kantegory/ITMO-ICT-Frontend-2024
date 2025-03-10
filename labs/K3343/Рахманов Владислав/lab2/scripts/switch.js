
    document.addEventListener('DOMContentLoaded', function() {
        const toggleSwitch = document.querySelector('#theme-toggle');

        if (toggleSwitch) {
            function switchTheme(e) {
                if (e.target.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            }

            toggleSwitch.addEventListener('change', switchTheme, false);

            const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

            if (currentTheme) {
                document.documentElement.setAttribute('data-theme', currentTheme);

                if (currentTheme === 'dark') {
                    toggleSwitch.checked = true;
                }
            }
        } else {
            console.error("Element with id 'theme-toggle' not found.");
        }
    });
