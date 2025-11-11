const container = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#addBookBtn');
const closeBtn = document.querySelector('#closeBtn');
const form = document.querySelector('form');

const myLibrary = [
   new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
   new Book("1984", "George Orwell", 328, false)
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

Book.prototype.toggleReadStatus = function() {
   this.read = !this.read;
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

      const div = document.createElement('div');

      const changeReadBtn = document.createElement('button')
      changeReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
      changeReadBtn.classList.add('changeReadBtn');
      div.appendChild(changeReadBtn);


      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add("deleteBtn")
      div.appendChild(deleteBtn)

      bookCard.appendChild(div);

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
   
   const card = e.target.closest('.card');
   if(!card) return;

   const bookId = card.dataset.id;

   if (e.target.classList.contains('deleteBtn')) {
      removeBook(bookId);
   }

   if (e.target.classList.contains('changeReadBtn')) {
      const book = myLibrary.find(book => book.id === bookId);
      if (book) {
         book.toggleReadStatus();
         displayBooks()
      }
   }
});

displayBooks();