document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const postCards = document.querySelectorAll(".post-card");
    const modalTitle = document.querySelector(".modal-title");
    const modalText = document.querySelector(".modal-text");
    const modalAuthor = document.querySelector(".author");
    const modalDate = document.querySelector(".date");
    const commentInput = document.getElementById("comment-input");
    const commentSubmit = document.getElementById("comment-submit");
    const commentList = document.querySelector(".comment-list");

    const articleContents = {
        "Top-10 life hacks for fast running": {
            content: "Fast running is great for cardiovascular health. At first glance, the idea of changing a behavior may seem simplistic because humans are adaptable and change frequently, even when we aren’t conscious of it.",
            sports: ["Running", "Stretching"]
        },
        "Sticking to an Exercise Program: 25 Tips to Achieve Exercise Success": {
            content: "This article describes effective fitness techniques. At first glance, the idea of changing a behavior may seem simplistic because humans are adaptable and change frequently, even when we aren’t conscious of it.",
            sports: ["Lifting", "Push up"]
        },
        "Training Secrets of Olympians to Help You Stay Fit": {
            content: "Olympians share their secrets to staying fit. At first glance, the idea of changing a behavior may seem simplistic because humans are adaptable and change frequently, even when we aren’t conscious of it.",
            sports: ["Stretching"]
        },
        "Green Exercise: The Benefits of Outdoor Exercise and How to Get Started": {
            content: "Studies have found that green exercise—or exercise performed in natural environments—can yield benefits beyond those seen with performing the same exercise indoors. At first glance, the idea of changing a behavior may seem simplistic because humans are adaptable and change frequently, even when we aren’t conscious of it.",
            sports: ["Treadmill"]
        },
        "What Is Behavior Change and How Does It Relate to Physical Activity?": {
            content: "Humans are capable of, and familiar with, change. As we experience life, we grow and change—not just physically, but mentally, emotionally, socially, intellectually and spiritually, as well. At first glance, the idea of changing a behavior may seem simplistic because humans are adaptable and change frequently, even when we aren’t conscious of it. ",
            sports: ["Stretching"]
        }
    };

    const commentsData = {};

    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    Object.keys(savedComments).forEach(title => {
        commentsData[title] = savedComments[title];
    });

    function renderComments(title) {
        commentList.innerHTML = "";
        if (commentsData[title]) {
            commentsData[title].forEach(comment => {
                const li = document.createElement("li");
                li.textContent = comment;
                commentList.appendChild(li);
            });
        }
    }

    postCards.forEach(card => {
        card.querySelector(".open-modal").addEventListener("click", () => {
            const title = card.querySelector(".post-title").innerText;
            const author = card.querySelector(".author-name").innerText;
            const date = card.getAttribute("data-date");
            const content = articleContents[title]?.content || "No content available.";

            modalTitle.innerText = title;
            modalText.innerText = content;
            modalAuthor.innerText = `Author: ${author}`;
            modalDate.innerText = `Date: ${date}`;

            renderComments(title);
            modal.classList.add("show");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    commentSubmit.addEventListener("click", () => {
        const title = modalTitle.innerText;
        const commentText = commentInput.value.trim();
        if (commentText) {
            if (!commentsData[title]) {
                commentsData[title] = [];
            }
            commentsData[title].push(commentText);
            localStorage.setItem("comments", JSON.stringify(commentsData));
            const li = document.createElement("li");
            li.textContent = commentText;
            commentList.appendChild(li);
            commentInput.value = "";
        }
    });

    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const sportFilters = document.querySelectorAll(".sport-filter");

    function filterPosts() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const selectedSports = Array.from(sportFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        postCards.forEach(function(post) {
            const postDate = new Date(post.dataset.date);
            const postTitle = post.querySelector('h2').textContent;
            const postSports = articleContents[postTitle]?.sports || [];
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
});


const postCards = document.querySelectorAll('.post-card');

for (let i = 0; i < postCards.length; i++) {
    const date = postCards[i].getAttribute('data-date');
    const dateSpan = postCards[i].querySelector('.post-date');
    dateSpan.textContent = `Published: ${date}`;
}