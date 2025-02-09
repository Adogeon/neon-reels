import { ref } from 'vue';

export default function useApiRequest<T>(fetchFn: (...args: any[]) => Promise<T>) {
    const data = ref<T | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const execute = async (...args: any[]) => {
        loading.value = true;
        error.value = null;
        try {
            const result = await fetchFn(...args);
            data.value = result;
        } catch (err) {
            error.value = "Something is wrong, please try again!"
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return { data, loading, error, execute };
}