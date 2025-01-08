function saveRecipe() {
    alert('Рецепт сохранен в вашем аккаунте!');
    // Здесь можно добавить логику для сохранения рецепта в базе данных
}

function likeRecipe() {
    const likeModal = new bootstrap.Modal(document.getElementById('likeModal'));
    likeModal.show();
}
