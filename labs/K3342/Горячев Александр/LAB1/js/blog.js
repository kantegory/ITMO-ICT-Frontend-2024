document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blogPosts'); // Fixed ID

    // Sample blog posts data
    const blogPosts = [
        {
            title: "5 Tips for Staying Fit",
            date: "2023-10-01",
            content: "Staying fit requires dedication and a balanced approach to exercise and nutrition. Here are five tips to help you stay on track..."
        },
        {
            title: "Nutrition Basics for Beginners",
            date: "2023-10-05",
            content: "Understanding nutrition is key to achieving your fitness goals. This article covers the basics of macronutrients and micronutrients..."
        },
        {
            title: "The Importance of Hydration",
            date: "2023-10-10",
            content: "Staying hydrated is crucial for overall health and performance. Learn how much water you should be drinking daily..."
        }
    ];

    // Function to load blog posts
    function loadBlogPosts() {
        if (!blogContainer) {
            console.error("Element with ID 'blogPosts' not found.");
            return;
        }

        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post', 'col-md-4', 'mb-4');
            postElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${post.title}</h3>
                        <p class="text-muted">${post.date}</p>
                        <p class="card-text">${post.content}</p>
                    </div>
                </div>
            `;
            blogContainer.appendChild(postElement);
        });
    }

    loadBlogPosts();
});