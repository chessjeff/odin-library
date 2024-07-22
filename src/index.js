import "./styles.css";
import { validateForm } from "./validate"

class Book {
    constructor(title, author, pageCount, isRead) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages`;
    }
}

//Variables
const myLibrary = [], 
    title = document.getElementById('title'),
    author = document.getElementById('author'),
    pageCount = document.getElementById('page-count'),
    isRead = document.getElementById('is-read'),
    booksList = document.querySelector('div.books'),
    dialog = document.querySelector('dialog'),
    openDialog = document.getElementById('open-dialog'),
    formButtons = Array.from(document.getElementsByClassName('form-button'));


openDialog.addEventListener('click', () => {
    dialog.showModal();
    validateForm();
});

formButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        if (button.id === 'add-book') {
            addBookToLibrary(title, author, pageCount, isRead);
            printBooks();
        }
        //input fields are cleared for next input
        [title.value, author.value, pageCount.value] = ['','','']
        dialog.close();
    }) 
})

function addBookToLibrary(title, author, pageCount, isRead) {
    if (title.value && author.value && pageCount.value && isRead.value) {
        isRead = isRead.value === '1' ? true : false; 
        const newBook = new Book(title.value, author.value, pageCount.value, isRead);
        myLibrary.push(newBook);
    }
}

function enableDelete(deleteButton) {
    deleteButton.addEventListener('click', function() {
        deleteBook(deleteButton);
    })
}

function deleteBook(deleteButton) {
    const id = parseInt(deleteButton.id.slice(-3));
    myLibrary.splice(id, 1);
    printBooks();
}

function enableToggle(readButton) {
    readButton.addEventListener('click', function() {
        toggleReadStatus(readButton);
    })
}

function toggleReadStatus(readButton) {
    const id = parseInt(readButton.id.slice(-3))
    myLibrary[id].isRead = !myLibrary[id].isRead;
    printBooks();
}

function printBooks() {
    //clears list when new book is added
    while (booksList.firstChild) {
        booksList.removeChild(booksList.firstChild);
    };
    //displays all books at once
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        
        const bookDiv = document.createElement('div'),
            bookInfo = document.createElement('p'),
            toggleReadButton = document.createElement('button'),
            deleteButton = document.createElement('button');

        //create elements
        bookDiv.classList.add('book');
        toggleReadButton.classList.add('read-status');
        deleteButton.classList.add('delete');
        //incremented ids allow functions to be called on any individual button
        deleteButton.setAttribute('id', `delete-${i.toString().padStart(3, '0')}`);
        toggleReadButton.setAttribute('id', `status-${i.toString().padStart(3, '0')}`);
        //enable buttons
        enableToggle(toggleReadButton);
        enableDelete(deleteButton);
        //add text to elements
        bookInfo.textContent = book.info();
        if (book.isRead) {
            toggleReadButton.textContent = 'Read';
        } else {
            toggleReadButton.textContent = 'Not Read';
        }
        deleteButton.textContent = 'Delete';
        //add elements to DOM
        booksList.appendChild(bookDiv);
        bookDiv.append(bookInfo, toggleReadButton, deleteButton);
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
const sirensOfTitan = new Book('The Sirens of Titan', 'Kurt Vonnegut', 326, 'read');
myLibrary.push(theHobbit);
myLibrary.push(sirensOfTitan);
printBooks();