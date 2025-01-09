import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark-theme') {
      document.body.classList.add('dark-theme')
      isDark.value = true
    }
  })

  const toggleTheme = () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('theme', '')
      isDark.value = false
    } else {
      document.body.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark-theme')
      isDark.value = true
    }
  }

  return {
    isDark,
    toggleTheme
  }
}
