import { ref, onMounted } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light-theme');

  const toggleTheme = () => {
    if (theme.value === 'light-theme') {
      theme.value = 'dark-theme';
    } else {
      theme.value = 'light-theme';
    }
    localStorage.setItem('theme', theme.value);
    document.body.className = theme.value;
  };

  onMounted(() => {
    document.body.className = theme.value;
  });

  return {
    theme,
    toggleTheme,
  };
}