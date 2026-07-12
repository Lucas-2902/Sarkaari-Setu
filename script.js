document.addEventListener("DOMContentLoaded", () => {
    console.log("Sarkaari-Setu+ Loaded");

    const tabButtons = document.querySelectorAll(".tabs button");
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".cards .card, .cards .card-new");

    let currentCategory = "all"; 

    function filterCards() {
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

        cards.forEach(card => {
            const title = card.querySelector("h2, h3") ? card.querySelector("h2, h3").textContent.toLowerCase() : "";
            const description = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
            const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);

            const matchesTab = (currentCategory === "all") || card.classList.contains(currentCategory);

            if (matchesTab && matchesSearch) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.classList.add("deactive");
            });
            button.classList.add("active");
            button.classList.remove("deactive");

            currentCategory = button.id;
            filterCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterCards);
    }

    filterCards();

    const splusBtn = document.getElementById("splusaime");
    if (splusBtn) {
        splusBtn.style.display = "block";
    }
});
