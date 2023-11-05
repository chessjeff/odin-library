function Book(title, author, pageCount) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages`;
    }
}

const myLibrary = [];

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageCountInput = document.getElementById('page-count');
const submitBook = document.getElementById('add-book');
const booksList = document.querySelector('div.books');

submitBook.addEventListener('click', function(event) {
    event.preventDefault();
    addBookToLibrary(titleInput, authorInput, pageCountInput);
    //input fields are cleared for next input
    titleInput.value = '';
    authorInput.value = '';
    pageCountInput.value = '';
    printBooks();
});

function addBookToLibrary(titleInput, authorInput ,pageCountInput) {
    const title = titleInput.value;
    const author = authorInput.value;
    const pageCount = pageCountInput.value;
    if (title && author && pageCount) {
        const newBook = new Book(title, author, pageCount)
        myLibrary.push(newBook)
        console.log(myLibrary)
    }
}

function printBooks() {
    //clears list when new book is added
    while (booksList.firstChild) {
        booksList.removeChild(booksList.firstChild)
    };
    //adds all books at once
    myLibrary.forEach(function(book) {
        const bookDiv = document.createElement('div');
        bookDiv.textContent = book.info();
        booksList.appendChild(bookDiv)
    })
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295);
const sirensOfTitan = new Book('The Sirens of Titan', 'Kurt Vonnegut', 326);
myLibrary.push(theHobbit);
myLibrary.push(sirensOfTitan);
printBooks();