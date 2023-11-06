function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages`;
    }
    this.isRead = isRead;
}

const myLibrary = [];

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageCountInput = document.getElementById('page-count');
const isReadInput = document.getElementById('is-read');
const booksList = document.querySelector('div.books');

const submitBook = document.getElementById('add-book');
submitBook.addEventListener('click', function(event) {
    event.preventDefault();
    addBookToLibrary(titleInput, authorInput, pageCountInput, isReadInput);
    //input fields are cleared for next input
    titleInput.value = '';
    authorInput.value = '';
    pageCountInput.value = '';
    isReadInput.selectedIndex = 0;
    printBooks();
});

function enableDelete() {
    const deleteButton = Array.from(document.getElementsByClassName('delete'));
    deleteButton.forEach((button) => {
        button.addEventListener('click', () => {
            deleteBook(button.id);
        })
    })
}

function deleteBook(id) {
    id = parseInt(id.slice(-3));
    myLibrary.splice(id, 1);
    printBooks();
}

function addBookToLibrary(titleInput, authorInput , pageCountInput, isReadInput) {
    const title = titleInput.value;
    const author = authorInput.value;
    const pageCount = pageCountInput.value;
    const isRead = isReadInput.value;
    if (title && author && pageCount && isRead) {
        const newBook = new Book(title, author, pageCount, isRead)
        myLibrary.push(newBook)
    }
}

function printBooks() {
    //clears list when new book is added
    while (booksList.firstChild) {
        booksList.removeChild(booksList.firstChild)
    };
    //displays all books at once
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        const bookDiv = document.createElement('div');
        const readDiv = document.createElement('div');
        const deleteButton = document.createElement('button');
        bookDiv.classList.add('book');
        readDiv.classList.add('read');
        deleteButton.classList.add('delete');
        //incremented delete ids allow deleteBook() to remove book i
        deleteButton.setAttribute('id', `delete-${i.toString().padStart(3, '0')}`);
        
        bookDiv.textContent = book.info();
        if (book.isRead === 'read') {
            readDiv.textContent = 'Read'
        } else {
            readDiv.textContent = 'Not Read'
        }
        deleteButton.textContent = 'Delete';

        booksList.appendChild(bookDiv);
        bookDiv.append(readDiv, deleteButton);
    }
    enableDelete();
}



const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
const sirensOfTitan = new Book('The Sirens of Titan', 'Kurt Vonnegut', 326, 'read');
myLibrary.push(theHobbit);
myLibrary.push(sirensOfTitan);
printBooks();