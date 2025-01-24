```javascript
// Article View Counter
const viewCounter = {
    incrementView: function(articleId) {
        let views = localStorage.getItem(`article_views_${articleId}`) || 0;
        views = parseInt(views) + 1;
        localStorage.setItem(`article_views_${articleId}`, views);
        return views;
    }
};

// Comment System
class CommentSystem {
    constructor(articleId) {
        this.articleId = articleId;
        this.comments = JSON.parse(localStorage.getItem(`comments_${articleId}`)) || [];
    }

    addComment(comment) {
        this.comments.push({
            id: Date.now(),
            text: comment,
            date: new Date().toISOString()
        });
        this.saveComments();
    }

    getComments() {
        return this.comments;
    }

    saveComments() {
        localStorage.setItem(`comments_${this.articleId}`, JSON.stringify(this.comments));
    }
}

// Admin Panel
const adminPanel = {
    login: function(password) {
        // Add your admin password validation here
        const validPassword = "your-admin-password";
        return password === validPassword;
    },

    showStats: function() {
        // Retrieve and display article statistics
        const stats = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('article_views_')) {
                const articleId = key.replace('article_views_', '');
                stats[articleId] = localStorage.getItem(key);
            }
        }
        return stats;
    }
};

// Search Functionality
function searchArticles(query) {
    // Implement article search functionality
    // This is a basic example - you'll need to customize based on your content
    const articles = document.querySelectorAll('.news-card');
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search bar functionality
    const searchBar = document.querySelector('.search-bar input');
    searchBar.addEventListener('input', (e) => searchArticles(e.target.value));

    // Admin login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            if (adminPanel.login(password)) {
                const stats = adminPanel.showStats();
                console.log('Article Statistics:', stats);
            }
        });
    }
});
```
