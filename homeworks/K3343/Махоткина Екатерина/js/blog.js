document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("post-modal");
    const modalTitle = document.querySelector('.title');
    const modalText = document.querySelector('.modal-text');
    const modalAuthor = document.querySelector('.author');
    const modalDate = document.querySelector('.date');
    const commentList = document.querySelector('.comment-list');
    const commentInput = document.getElementById("comment-input");
    const commentSubmit = document.getElementById("comment-submit");



    let users = [];
    let posts = [];

    const postsURL = 'http://localhost:3000/posts';
    const usersURL = 'http://localhost:3000/users';
    const commentsURL = 'http://localhost:3000/comments';

    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const sportFilters = document.querySelectorAll(".sport-filter");

    function filterPosts() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const selectedSports = Array.from(sportFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const postCards = document.querySelectorAll('.post-card');

        postCards.forEach(function(post) {
            const postDate = new Date(post.dataset.date);
            const postTitle = post.querySelector('h3').textContent;
            const thisPost = posts.find(p => p.title === postTitle);
            const postSports = thisPost.sports || [];
            const dateInRange = (isNaN(startDate) || postDate >= startDate) && (isNaN(endDate) || postDate <= endDate);
            const sportsMatch = selectedSports.length === 0 || selectedSports.some(sport => postSports.includes(sport));

            if (dateInRange && sportsMatch) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    }

    startDateInput.addEventListener("input", filterPosts);
    endDateInput.addEventListener("input", filterPosts);
    sportFilters.forEach(filter => {
        filter.addEventListener("change", filterPosts);
    });

    fetch(usersURL)
        .then(response => response.json())
        .then(data => {
            users = data;
            return fetch(postsURL);
        })
        .then(response => response.json())
        .then(data2 => {
            posts = data2;

            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';

            if (!Array.isArray(posts) || posts.length === 0) {
                postsContainer.innerHTML = '<p>No posts available.</p>';
                return;
            }

            posts.forEach(post => {
                const postCard = document.createElement('div');
                const author = users.find(user => user.id === post.authorId);
                postCard.classList.add('post-card');
                postCard.innerHTML = `
                    <div class="card mb-4" data-date="${post.date}">
                        <h3>${post.title}</h3>
                        <p>Author: ${author ? author.name : 'Unknown Author'}</p>
                        <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
                        <button class="open-modal" data-id="${post.id}">Show post</button>
                    </div>
                `;
                postsContainer.appendChild(postCard);

                postCard.querySelector(".open-modal").addEventListener("click", () => {
                    modalTitle.innerText = post.title;
                    modalText.innerText = post.content;
                    modalAuthor.innerText = `Author: ${author ? author.name : 'Unknown Author'}`;
                    modalDate.innerText = `Date: ${new Date(post.date).toLocaleDateString()}`;
                    modal.setAttribute("data-post-id", post.id);

                    renderComments(post.id);
                    modal.classList.add("show");
                });
            });
        })
        .catch(error => {
            console.error('Error', error);
            document.getElementById('posts-container').innerHTML = '<p>Error loading posts.</p>';
        });

    document.querySelector(".close").addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    commentSubmit.addEventListener("click", () => {
        const postId = Number(modal.getAttribute("data-post-id"));
        const commentText = commentInput.value.trim();
        const userId = getCurrentUserId();
        if (commentText && userId) {
            const newComment = {
                postId: postId,
                userId: userId,
                text: commentText,
            };
            fetch(commentsURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(comment => {
                    const user = users.find(user => user.id === userId);
                    const li = document.createElement("li");
                    li.textContent = `${user ? user.name : 'Unknown'}: ${commentText}`;
                    commentList.appendChild(li);
                    commentInput.value = "";
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        } else {
            alert('Enter a comment and make sure you are logged in');
        }
    });

    function renderComments(postId) {
        commentList.innerHTML = "";
        fetch(`${commentsURL}?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const user = users.find(user => user.id === comment.userId);
                    const li = document.createElement("li");
                    li.textContent = `${user ? user.name : 'Unknown User'}: ${comment.text}`;
                    commentList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                commentList.innerHTML = '<li>Error loading comments.</li>';
            });
    }
});

function getCurrentUserId() {
    return localStorage.getItem('userId');
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        modal.classList.remove("show");
    }
});
