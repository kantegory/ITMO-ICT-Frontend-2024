document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        var themeSwitcher = document.getElementById("themeSwitcher");
    
        function toggleTheme() {
            const isChecked = themeSwitcher.checked;
            const newTheme = isChecked ? "vanilla-dark" : "";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        }
    
        const savedTheme = localStorage.getItem("theme") || "";
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeSwitcher.checked = savedTheme === "vanilla-dark";
    
        themeSwitcher.addEventListener("change", toggleTheme);
    }, 50)
});
