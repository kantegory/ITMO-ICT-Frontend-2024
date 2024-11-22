# Страница рецепта

Мы тестово добавили 8 рецептов: Apple pie, Bolognese pasta, Fish and chips, Full breakfast, Khinkali, Lasagna, Pancakes, Tom Yum.

Html код для каждого рецепта одинаковый, отличается только список ингридиентов и шаги готовки. Для примера покажем код и скриншота рецепта Apple pie.

На странице каждого рецепта можно поставить лайк, написать комменатрий и подписаться на автора. 

**код из файла recipe_apple_pie.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recipe | Recipe App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <div class="container">
    <h2 class="text-center my-4">Autumn Apple Pie</h2>
    <div class="recipe-content">
      <img src="../img/top-view-pie-coffee.jpg" class="img-fluid mb-3" alt="Recipe Image">
      <p>Favorite autumn recipe</p>
      <h5>Ingredients:</h5>
      <ul>
        <li>Apples</li>
        <li>Sugar</li>
        <li>Cinnamon</li>
        <li>Pie crust</li>
      </ul>
      <h5>Steps:</h5>
      <ol>
        <li>Prepare crust: Roll out a pre-made or homemade pie crust and place it in a pie dish.</li>
        <li>Make apple filling: Peel, core, and slice about 6 apples. Mix with sugar, cinnamon, nutmeg, and flour.</li>
        <li>Pour the apple mixture into the pie crust.</li>
        <li>Cover with another layer of pie crust or a lattice. Trim excess dough and crimp edges.</li>
        <li>Bake: Preheat oven to 375°F (190°C). Bake for 50-60 minutes until the crust is golden brown and apples are tender.</li>
      </ol>
      <div class="mt-4 d-flex align-items-center">
        <button class="btn btn-primary me-2" id="likeBtn">Like <span id="likeCount">0</span></button>
        <button class="btn btn-secondary" data-toggle="modal" data-target="#commentModal">Comment</button>
        <div class="me-3">
          <strong>Author:</strong> <span id="authorName">John Doe</span>
        </div>
        <button class="btn btn-secondary" id="subscribeBtn">Subscribe to Author</button>
      </div>

      <h5 class="mt-4">Comments:</h5>
      <div id="commentsList" class="border p-3">
        <!-- Здесь будут отображаться комментарии -->
      </div>
    </div>

    <!-- Модальное окно для комментариев -->
    <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLabel">Add Comment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <textarea class="form-control" id="commentText" rows="3" placeholder="Enter your comment"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="submitCommentBtn">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="../js/recipe.js"></script> <!-- Подключаем JavaScript файл -->
</body>
</html>
```

На странице каждого рецепта можно поставить лайк, написать комменатрий и подписаться на автора. 
Для этого мы создали два js файла.

**код из файла recipe.js:**
```javascript
// Инициализация переменной для хранения количества лайков
let likeCount = 0;

// Функция для обработки нажатия на кнопку "Лайк"
document.getElementById('likeBtn').addEventListener('click', function() {
    likeCount += 1; // Увеличиваем количество лайков на 1
    document.getElementById('likeCount').textContent = likeCount; // Обновляем текст счетчика
});

// Функция для обработки нажатия на кнопку "Подписаться"
document.getElementById('subscribeBtn').addEventListener('click', function() {
    // Выводим модальное окно подписки
    const subscriptionModalHtml = `
        <div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="subscribeModalLabel">Subscribe to Author</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>You have successfully subscribed to <strong>John Doe</strong>.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Вставляем модальное окно в DOM
    document.body.insertAdjacentHTML('beforeend', subscriptionModalHtml);

    // Открываем модальное окно
    $('#subscribeModal').modal('show');

    // Удаляем модальное окно после закрытия
    $('#subscribeModal').on('hidden.bs.modal', function () {
        $(this).remove(); // Удаляем модальное окно из DOM после закрытия
    });
});

// Функция для обработки нажатия на кнопку "Отправить комментарий"
document.getElementById('submitCommentBtn').addEventListener('click', function() {
    const commentText = document.getElementById('commentText').value; // Получаем текст комментария
    if (commentText) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('div'); // Создаем новый div для комментария
        newComment.classList.add('comment'); // Класс для стилей
        newComment.textContent = commentText; // Устанавливаем текст комментария
        commentsList.appendChild(newComment); // Добавляем новый комментарий в список

        // Очищаем поле ввода комментария
        document.getElementById('commentText').value = '';

        // Закрываем модальное окно после добавления комментария
        $('#commentModal').modal('hide');
    } else {
        alert('Please enter a comment before submitting.'); // Предупреждение, если комментарий пустой
    }
});
```

**код из файла scripts.js:**
```javascript
// Валидация форм
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Логика валидации
  alert("Login form submitted!");
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
  } else {
    alert("Registration form submitted!");
  }
});

// Лайк на странице рецепта
let likeCount = 0;
document.getElementById('likeBtn').addEventListener('click', function() {
  likeCount++;
  document.getElementById('likeCount').innerText = likeCount;
});

```

**Страница рецепта Apple pie на скриншоте**
![Страница рецепта на скриншоте](images/recipe_apple_pie_pic.png)
**Лайк и комментарий к рецепту Apple pie на скриншоте**
![Лайк и комментарий к рецепту Apple pie на скриншоте](images/like_and_comment_of_recipe.png)
**Подписка на автора рецепта Apple pie на скриншоте**
![Подписка на автора рецепта Apple pie на скриншоте](images/Subscribe.png)


