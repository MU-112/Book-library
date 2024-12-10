const books = [
    { title: "The Great Gatsby", category: "Fiction", image: "https://via.placeholder.com/200x300?text=The+Great+Gatsby" },
    { title: "Sapiens", category: "Non-Fiction", image: "https://via.placeholder.com/200x300?text=Sapiens" },
    { title: "Brief Answers to the Big Questions", category: "Science", image: "https://via.placeholder.com/200x300?text=Brief+Answers" },
    { title: "A Brief History of Time", category: "Science", image: "https://via.placeholder.com/200x300?text=History+of+Time" },
    { title: "1984", category: "Fiction", image: "https://via.placeholder.com/200x300?text=1984" },
    { title: "Clean Code", category: "Technology", image: "https://via.placeholder.com/200x300?text=Clean+Code" },
    { title: "The Lean Startup", category: "Business", image: "https://via.placeholder.com/200x300?text=Lean+Startup" },
    { title: "Harry Potter and the Philosopher's Stone", category: "Fiction", image: "https://via.placeholder.com/200x300?text=Harry+Potter" },
    { title: "Thinking, Fast and Slow", category: "Non-Fiction", image: "https://via.placeholder.com/200x300?text=Thinking+Fast+Slow" },
    { title: "The Art of Computer Programming", category: "Technology", image: "https://via.placeholder.com/200x300?text=Art+of+Programming" },
    { title: "To Kill a Mockingbird", category: "Fiction", image: "https://via.placeholder.com/200x300?text=To+Kill+a+Mockingbird" },
    { title: "The Innovator's Dilemma", category: "Business", image: "https://via.placeholder.com/200x300?text=Innovator's+Dilemma" },
    { title: "Cosmos", category: "Science", image: "https://via.placeholder.com/200x300?text=Cosmos" },
];


const history = [];

document.addEventListener("DOMContentLoaded", () => {
    const bookContainer = document.getElementById("books");
    const searchInput = document.getElementById("search");
    const historyContainer = document.getElementById("history");
    const navbar = document.getElementById("navbar");

    function displayBooks(filter = "", category = "all") {
        bookContainer.innerHTML = "";
        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = category === "all" || book.category === category;
            return matchesSearch && matchesCategory;
        });

        if (filteredBooks.length === 0) {
            bookContainer.innerHTML = `<p>No books found!</p>`;
            return;
        }

        filteredBooks.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";
            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div class="content">
                    <h3>${book.title}</h3>
                    <p>${book.category}</p>
                    <button onclick="borrowBook('${book.title}')">Borrow</button>
                </div>
            `;
            bookContainer.appendChild(bookCard);
        });
    }

    window.borrowBook = function (title) {
        history.push(title);
        updateHistory();
        alert(`${title} has been borrowed!`);
    };

    function updateHistory() {
        historyContainer.innerHTML = "";
        history.forEach((book, index) => {
            const historyItem = document.createElement("li");
            historyItem.textContent = `${index + 1}. ${book}`;
            historyContainer.appendChild(historyItem);
        });
    }

    navbar.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            document.querySelectorAll("#navbar li").forEach(li => li.classList.remove("active"));
            e.target.classList.add("active");
            const category = e.target.dataset.category;
            displayBooks(searchInput.value, category);
        }
    });

    searchInput.addEventListener("input", (e) => {
        const activeCategory = document.querySelector("#navbar li.active").dataset.category;
        displayBooks(e.target.value, activeCategory);
    });

    displayBooks();
});
