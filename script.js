const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const level = btn.dataset.level;

        courseCards.forEach(card => {
            if (level === "all" || card.dataset.level === level) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
