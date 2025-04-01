// Хранение комментариев в "базе данных" (в реальном приложении это был бы сервер)
const commentsDB = {
    product1: [],
    product2: [],
    product3: []
};

// Загрузка комментариев для продукта
function loadComments(productId) {
    const commentsList = document.getElementById(`${productId}-comments-list`);
    commentsList.innerHTML = '';
    
    commentsDB[productId].forEach(comment => {
        // Уязвимость: Stored XSS - комментарии вставляются без санитизации
        commentsList.innerHTML += `<div class="comment"><p>${comment}</p></div>`;
    });
}

// Добавление нового комментария
function addComment(productId) {
    const commentText = document.getElementById(`${productId}-comment-text`).value;
    if (commentText.trim() === '') return;
    
    // Добавляем комментарий в "базу данных"
    commentsDB[productId].push(commentText);
    
    // Очищаем поле ввода
    document.getElementById(`${productId}-comment-text`).value = '';
    
    // Перезагружаем комментарии
    loadComments(productId);
}