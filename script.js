const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#addBookBtn');
const closeBtn = document.querySelector('#closeBtn');
const form = document.querySelector('form');

const myLibrary = [
   {
      title: "To Kill a Mockingbird", 
      author: "Harper Lee", 
      pages: 281, 
      read: true,
   },
   {
      title: "1984",
      author: "George Orwell",
      pages: 328,
      read: false,
   }
];

function Book(title, author, pages, read) {
 if (!new.target) {
    throw Error('You must use the new operator to call this constructor');
 }
 this.id = crypto.randomUUID();
 this.title = title;
 this.author = author;
 this.pages = pages;
 this.read = read;
}

function addBookToLibrary() {
   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const pages = document.querySelector('#pages').value;
   const read = document.querySelector('#read').checked;

   const newBook = new Book(title,author,pages,read);
   myLibrary.push(newBook);
}


function displayBooks() {
   const container = document.querySelector('.container');
   container.textContent = '';

   myLibrary.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('card');

      const titleEl = document.createElement('h3');
      titleEl.textContent = `Title: ${book.title}`;
      bookCard.appendChild(titleEl)

      const authorEl = document.createElement('p');
      authorEl.textContent = `Author: ${book.author}`;
      bookCard.appendChild(authorEl);

      const pagesEl = document.createElement('p');
      pagesEl.textContent =  `Pages: ${book.pages}`;
      bookCard.appendChild(pagesEl);

      const readEl = document.createElement('p');
      readEl.textContent = `Read: ${book.read ? "Read" : "Not read"}`;
      bookCard.appendChild(readEl);

      container.appendChild(bookCard);
   });
}

showButton.addEventListener("click", () => {
   dialog.showModal();
});

form.addEventListener("submit", (e) => {
   e.preventDefault();

   addBookToLibrary();
   dialog.close();
   form.reset();
   displayBooks();
});

displayBooks();