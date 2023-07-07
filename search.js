var books = [
    {
      id: 1,
      title: "Python",
      author: "mathews",
      genre: "Programming",
      yearOfPublishing: 2010,
      available: true,
      copies: 100
    },
    {
      id: 2,
      title: "Harry Potter",
      author: "J K Rowling",
      genre: "Mystery",
      yearOfPublishing: 2015,
      available: true,
      copies: 150
    },
    {
      id: 3,
      title: "Mahabarat",
      author: "Vyasa",
      genre: "Historic Novel",
      yearOfPublishing: 1978,
      available: true,
      copies: 100
    },
    // Add more book objects as needed
  ];
  
  var searchInput = document.getElementById("search-input");
  var suggestionsList = document.getElementById("suggestions-list");
  var bookCount = document.getElementById("book-count");
  var bookList = document.getElementById("book-list");
  var sortSelect = document.getElementById("sort-select");
  var cartItems = document.getElementById("cart-items");
  
  // Variables to store the filtered and sorted book data
  var filteredBooks = [];
  var sortedBooks = [];
  
  searchInput.addEventListener("input", function() {
    var inputValue = searchInput.value.toLowerCase();
    var suggestions = [];
  
    // Filter the books based on multiple fields
    suggestions = books.filter(function(book) {
      return (
        book.title.toLowerCase().includes(inputValue) ||
        book.author.toLowerCase().includes(inputValue) ||
        book.genre.toLowerCase().includes(inputValue) ||
        book.yearOfPublishing.toString().includes(inputValue)
      );
    });
  
    // Generate the suggestion items dynamically
    var suggestionItems = suggestions.map(function(book) {
      return `<li>${book.title}</li>`;
    });
  
    // Update the suggestions list
    suggestionsList.innerHTML = suggestionItems.join("");
  });
  
  suggestionsList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
      var selectedSuggestion = event.target.innerText;
      searchInput.value = selectedSuggestion;
      suggestionsList.innerHTML = ""; // Clear the suggestions list
      // Perform search with the selected suggestion
      performSearch(selectedSuggestion);
    }
  });
  
  sortSelect.addEventListener("change", function() {
    var selectedSort = sortSelect.value;
    // Perform sorting based on the selected sort option
    sortBooks(selectedSort);
  });
  
  function performSearch(query) {
    filteredBooks = books.filter(function(book) {
      return (
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase()) ||
        book.yearOfPublishing.toString().includes(query)
      );
    });
  
    // Update book count
    updateBookCount(filteredBooks.length);
  
    // Update book list
    displayBooks(filteredBooks);
  }
  
  function sortBooks(sortBy) {
    sortedBooks = filteredBooks.slice();
  
    switch (sortBy) {
      case "title":
        sortedBooks.sort(function(a, b) {
          return a.title.localeCompare(b.title);
        });
        break;
      case "author":
        sortedBooks.sort(function(a, b) {
          return a.author.localeCompare(b.author);
        });
        break;
      case "genre":
        sortedBooks.sort(function(a, b) {
          return a.genre.localeCompare(b.genre);
        });
        break;
      case "year":
        sortedBooks.sort(function(a, b) {
          return a.yearOfPublishing - b.yearOfPublishing;
        });
        break;
    }
  
    // Update book list
    displayBooks(sortedBooks);
  }
  
  function updateBookCount(count) {
    bookCount.innerText = `Total books: ${count}`;
  }
  
  function displayBooks(booksToDisplay) {
    bookList.innerHTML = "";
  
    booksToDisplay.forEach(function(book) {
      var bookItem = document.createElement("div");
      bookItem.className = "book-item";
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Year of Publishing:</strong> ${book.yearOfPublishing}</p>
        <p><strong>Availability:</strong> ${book.available ? "Available" : "Out of Stock"}</p>
        <p><strong>Copies:</strong> ${book.copies}</p>
        <button data-book-id="${book.id}" class="add-to-cart-button" ${book.available ? "" : "disabled"}>Add to Cart</button>
      `;
  
      bookList.appendChild(bookItem);
    });
  
    // Update add-to-cart button event listeners
    var addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    Array.from(addToCartButtons).forEach(function(button) {
      button.addEventListener("click", function(event) {
        var bookId = parseInt(event.target.dataset.bookId);
        addToCart(bookId);
      });
    });
  }
  
  function addToCart(bookId) {
    var book = books.find(function(book) {
      return book.id === bookId;
    });
  
    if (book && book.available && book.copies > 0) {
      // Reduce the number of available copies
      book.copies--;
  
      // Create a cart item
      var cartItem = document.createElement("li");
      cartItem.innerText = book.title;
      cartItem.dataset.bookId = book.id;
  
      // Add the cart item to the cart
      cartItems.appendChild(cartItem);
    }
  }
 
  
  
  
  