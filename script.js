const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#addBookBtn');
const closeBtn = document.querySelector('#closeBtn');
const form = document.querySelector('form');

const myLibrary = [
   {
      id : crypto.randomUUID(),
      title: "To Kill a Mockingbird", 
      author: "Harper Lee", 
      pages: 281, 
      read: true,
   },
   {  
      id : crypto.randomUUID(),
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

function removeBook(id) {
   const index = myLibrary.findIndex(book => book.id === id);
   if (index !== -1) {
      myLibrary.splice(index, 1);
   }
   displayBooks();
}


function displayBooks() {
   container.textContent = '';

   myLibrary.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('card');
      bookCard.dataset.id = book.id;

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

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add("deleteBtn")
      bookCard.appendChild(deleteBtn);

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

container.addEventListener("click", (e) => {
   if (e.target.classList.contains('deleteBtn')) {
      const card = e.target.closest('.card');
      const bookId = card.dataset.id;
      removeBook(bookId);
   }
})

displayBooks();