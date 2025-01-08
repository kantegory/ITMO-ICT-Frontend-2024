export function useModal() {
    function openModal(modalId) {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            new bootstrap.Modal(modalElement).show();
        } else {
            console.error(`Не найден элемент модального окна с id '${modalId}'.`);
        }
    }

    return {
        openModal,
    };
}
