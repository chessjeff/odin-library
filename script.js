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

//Dialog input variables
const title = document.getElementById('title');
const author = document.getElementById('author');
const pageCount = document.getElementById('page-count');
const isRead = document.getElementById('is-read');
const booksList = document.querySelector('div.books');
const dialog = document.querySelector('dialog');
const openDialog = document.getElementById('open-dialog');
openDialog.addEventListener('click', () => {
    dialog.showModal()
});

const submitBook = document.getElementById('add-book');
submitBook.addEventListener('click', function(event) {
    event.preventDefault();
    addBookToLibrary(title, author, pageCount, isRead);
    //input fields are cleared for next input
    title.value = '';
    author.value = '';
    pageCount.value = '';
    isRead.selectedIndex = 0;
    printBooks();
    dialog.close();
});

function enableDelete() {
    const deleteButtons = Array.from(document.getElementsByClassName('delete'));
    deleteButtons.forEach((button) => {
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

function toggleReadStatus() {
    const toggleReadButtons = Array.from(document.getElementsByClassName('read-status'))
    toggleReadButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const id = parseInt(button.id.slice(-3))
            myLibrary[id].isRead = !myLibrary[id].isRead
            console.log(myLibrary[id].isRead)
        })
    })
}

function addBookToLibrary(title, author, pageCount, isRead) {
    if (title.value && author.value && pageCount.value && isRead.value) {
        isRead = isRead.value === '1' ? true : false; 
        const newBook = new Book(title.value, author.value, pageCount.value, isRead)
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
        const toggleReadButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        bookDiv.classList.add('book');
        toggleReadButton.classList.add('read-status');
        deleteButton.classList.add('delete');
        //incremented ids allow buttons to execute on any individual i
        deleteButton.setAttribute('id', `delete-${i.toString().padStart(3, '0')}`);
        toggleReadButton.setAttribute('id', `status-${i.toString().padStart(3, '0')}`)
        bookDiv.textContent = book.info();
        
        // labelToggle();
        if (book.isRead) {
            toggleReadButton.textContent = 'Read'
        } else {
            toggleReadButton.textContent = 'Not Read'
        }
        deleteButton.textContent = 'Delete';
        
        booksList.appendChild(bookDiv);
        bookDiv.append(toggleReadButton, deleteButton);
    }
    enableDelete();
    toggleReadStatus();
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
const sirensOfTitan = new Book('The Sirens of Titan', 'Kurt Vonnegut', 326, 'read');
myLibrary.push(theHobbit);
myLibrary.push(sirensOfTitan);
printBooks();