document.addEventListener('DOMContentLoaded', function() {
    const feedbackList = document.getElementById('feedbackList');
    
    // Simulated feedback data
    let feedbackData = [
        { name: "Ali", rating: 5, comment: "Ajoyib sayt! Juda foydali." },
        { name: "Nodira", rating: 4, comment: "Sayt yaxshi, lekin ba'zi joylarda yaxshilanish kerak." }
    ];

    // Function to render feedback list
    function renderFeedback() {
        feedbackList.innerHTML = ''; // Clear existing list

        feedbackData.forEach(feedback => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <div class="feedback-info">
                        <span>${feedback.name}</span> | <span class="rating">${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</span>
                    </div>
                    <div class="feedback-text">${feedback.comment}</div>
                </div>
                <div class="feedback-actions">
                    <button class="delete-btn" onclick="deleteFeedback('${feedback.name}')">O'chirish</button>
                </div>
            `;
            feedbackList.appendChild(li);
        });
    }

    // Render feedback initially
    renderFeedback();

    // Feedback form submission
    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        feedbackData.push({ name: userName, rating: parseInt(rating), comment });

        // Clear the form fields
        document.getElementById('feedbackForm').reset();

        // Re-render feedback list
        renderFeedback();
    });
});

// Delete feedback
function deleteFeedback(userName) {
    feedbackData = feedbackData.filter(feedback => feedback.name !== userName);
    renderFeedback();
}
