const openModalButton = document.getElementById("openModalBtn");
const closeModalButton = document.getElementById("closeModalBtn");
const modal = document.getElementById("myModal");

const myLibrary = [];

function Book(author, title, pageNumber, read){
    this.author = author;
    this.title = title;
    this.pageNumber = pageNumber;
    this.read = read;

    this.changeRead = function(){
        let opposite = !this.read;
        this.read = opposite;
    }

    this.remove = function(){
        removeBookFromLibrary(this.title);
    }
}

function addBookToLibrary(event){
    event.preventDefault();
    
    const title = document.getElementById('book-title-input').value;
    const author = document.getElementById('author-input').value;
    const pageNo = document.getElementById('number-of-pages-input').value;
    const readYes = document.getElementById('read-input').checked;
    const readNo = document.getElementById('unread-input').checked;

    
    let book = new Book(author, title, pageNo, readYes ? readYes : false);
    myLibrary.push(book);
    modal.style.display = "none";
    displayBooks();
}

function removeBookFromLibrary(title){
    myLibrary.forEach(book=>{
        if(book.title === title){
            myLibrary.splice(myLibrary.indexOf(book));       
        }
    });
    displayBooks();
}

function displayBooks(){
    const bookContainer = document.querySelector('.books-container');

    bookContainer.innerHTML = "";

    myLibrary.forEach(element => {
        let newHtmlBook = document.createElement('div');
        newHtmlBook.classList.add('book');
        
        let bookTitle = document.createElement('h3');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = 'Book Title: ' + element.title;
        
        let author = document.createElement('h4');
        author.classList.add('author');
        author.textContent = 'Author: ' + element.author;
        
        let pageNumber = document.createElement('h4');
        pageNumber.classList.add('page-number');
        pageNumber.textContent = 'Number Of Pages: ' + element.pageNumber;
        
        let readStat = document.createElement('h4');
        readStat.classList.add('read-status');
        readStat.textContent = 'Read: ' + element.read;
        
        let bookActions = document.createElement('div');
        bookActions.classList.add('book-actions');
        let btnRemove = document.createElement('button');
        btnRemove.classList.add('btn-remove');
        btnRemove.textContent = 'Remove';
        btnRemove.addEventListener('click', ()=>{
            element.remove();
        });
        
        let btnMarkRead = document.createElement('button');
        btnMarkRead.classList.add('btn-mark-read');
        btnMarkRead.textContent = 'Mark Read';
        btnMarkRead.addEventListener('click', () => {
            element.changeRead();
            displayBooks();
        });


        bookActions.appendChild(btnRemove);
        bookActions.appendChild(btnMarkRead);

        newHtmlBook.appendChild(bookTitle);
        newHtmlBook.appendChild(author);
        newHtmlBook.appendChild(pageNumber);
        newHtmlBook.appendChild(readStat);
        newHtmlBook.appendChild(bookActions);

        bookContainer.appendChild(newHtmlBook);
    });
}

// Open the modal when the button is clicked
openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});