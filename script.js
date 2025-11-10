const myLibrary = [];

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

}


function displayBooks(myLibrary) {
   const container = document.querySelector('.container');
   container.textContent = '';

   myLibrary.array.forEach(book => {
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
   });
   container.appendChild(bookCard);
      
}