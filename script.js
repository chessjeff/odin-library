function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages`;
    }
    this.isRead = isRead;
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
    submitBook = document.getElementById('add-book'),
    closeDialog = document.getElementById('close-dialog');

openDialog.addEventListener('click', () => {
    dialog.showModal()
});

submitBook.addEventListener('click', function(e) {
    e.preventDefault();
    addBookToLibrary(title, author, pageCount, isRead);
    //input fields are cleared for next input
    title.value = '';
    author.value = '';
    pageCount.value = '';
    isRead.selectedIndex = 0;
    printBooks();
    dialog.close();
});

closeDialog.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
})

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
    myLibrary[id].isRead = !myLibrary[id].isRead
    printBooks();
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
        
        const bookDiv = document.createElement('div'),
            toggleReadButton = document.createElement('button'),
            deleteButton = document.createElement('button');

        //create elements
        bookDiv.classList.add('book');
        toggleReadButton.classList.add('read-status');
        deleteButton.classList.add('delete');
        //incremented ids allow buttons to execute on any individual i
        deleteButton.setAttribute('id', `delete-${i.toString().padStart(3, '0')}`);
        toggleReadButton.setAttribute('id', `status-${i.toString().padStart(3, '0')}`)
        //enableButtons
        enableToggle(toggleReadButton);
        enableDelete(deleteButton);
        //add text to elements
        bookDiv.textContent = book.info();
        if (book.isRead) {
            toggleReadButton.textContent = 'Read'
        } else {
            toggleReadButton.textContent = 'Not Read'
        }
        deleteButton.textContent = 'Delete';
        //add elements to DOM
        booksList.appendChild(bookDiv);
        bookDiv.append(toggleReadButton, deleteButton);
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
const sirensOfTitan = new Book('The Sirens of Titan', 'Kurt Vonnegut', 326, 'read');
myLibrary.push(theHobbit);
myLibrary.push(sirensOfTitan);
printBooks();