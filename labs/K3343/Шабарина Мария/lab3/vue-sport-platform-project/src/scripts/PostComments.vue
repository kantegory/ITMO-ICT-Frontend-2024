<template>
  <div>
    <h5>Comments:</h5>
    <ul class="comment-list">
      <li v-for="comment in commentList" :key="comment.id">
        {{ comment.user ? comment.user + ': ' : 'Unknown User: ' }}{{ comment.text }}
      </li>
    </ul>
    <div class="mt-3">
      <input v-model="commentInput" type="text" class="form-control" placeholder="Type your comment">
      <button @click="submitComment" class="btn btn-primary mt-2">Add Comment</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      commentInput: '',
      commentList: [],
      users: [],
    };
  },
  async mounted() {
    await this.fetchUsers();
    this.renderComments(this.postId);
  },
  methods: {
    async fetchUsers() {
      const response = await fetch('http://localhost:3000/users');
      this.users = await response.json();
    },
    getCurrentUserId() {
      const storedUser = localStorage.getItem('user');
      const user = JSON.parse(storedUser);
      return user ? user.id : null;
    },
    submitComment() {
      const postId = this.postId;
      const commentText = this.commentInput;
      const userId = this.getCurrentUserId();
      if (commentText && userId) {
        const newComment = {
          postId: postId,
          userId: userId,
          text: commentText,
        };
        fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response error');
              }
              return response.json();
            })
            .then(comment => {
              const user = this.users.find(user => user.id === userId);
              comment.userName = user ? user.name : 'Unknown User';
              this.commentList.push(comment);
              this.commentInput = "";
            })
      } else {
        alert('Enter a comment and make sure you are logged in');
      }
    },
    renderComments(postId) {
      this.commentList = [];
      fetch(`http://localhost:3000/comments?postId=${postId}`)
          .then(response => response.json())
          .then(comments => {
            comments.forEach(comment => {
              const user = this.users.find(user => user.id === comment.userId);
              this.commentList.push({
                ...comment,
                user: user ? user.name : 'Unknown User'
              });
            });
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
            this.commentList = [{text: 'Error loading comments.'}];
          });
    }
  }
};
</script>

<style scoped>
.btn-primary {
  padding: 10px 20px;
  background-color: #1d7e33;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.btn-primary:hover {
  background-color: #555;
}

.comment-list li {
  color: #bbbbbb;
}
</style>
