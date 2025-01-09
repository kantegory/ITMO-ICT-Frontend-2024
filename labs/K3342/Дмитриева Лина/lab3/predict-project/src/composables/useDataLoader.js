import useApi from "@/composables/useApi";
import { ref } from "vue";

export default function useDataLoader(endpoint) {
  const api = useApi();
  const data = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  const loadData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api[endpoint]();
      data.value = response.data;
    } catch (err) {
      console.error(`Ошибка загрузки данных с ${endpoint}:`, err);
      error.value = "Ошибка загрузки данных.";
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, error, loadData };
}
