const searchInput = document.getElementById("search");
const cardsContainer = document.getElementById("cards-container");

// Search Functionality
searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.toLowerCase();
  const cards = cardsContainer.querySelectorAll(".card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(searchQuery) ? "block" : "none";
  });
});

