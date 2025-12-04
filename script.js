class Book {
   id;
   title;
   author;
   pages;
   read;
   cover;

   constructor(title, author, pages, read, cover) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
      this.cover = cover;
   }

   toggleReadStatus() {
      this.read = !this.read;
   }
}

class Library {
   constructor() {
      this.books = [];
   }

   addBook(book) {
      this.books.push(book);
   }
   
   removeBook(id) {
      const index = this.books.findIndex(book => book.id === id);
      if(index !== -1) {
         this.books.splice(index, 1);
      }
   }

   toggleReadStatus(id) {
      const index = this.books.findIndex(book => book.id === id);
      this.books[index].read = !this.books[index].read;
   }

   getBooks() {
      return this.books;
   }
}

class DisplayController {
   constructor(library) {
      this.library = library;
      this.container = document.querySelector('.container');
      this.dialog = document.querySelector('dialog');
      this.showButton = document.querySelector('#addBookBtn');
      this.closeBtn = document.querySelector('#closeBtn');
      this.form = document.querySelector('form');

      this.initEventListeners()
   }

      displayBooks() {   
      this.container.textContent = "";
      
      this.library.getBooks().forEach(book => {
         const bookCard = document.createElement('div');
         bookCard.classList.add('card');
         bookCard.dataset.id = book.id;

         if(book.cover) {
            const imgEl = document.createElement('img');
            imgEl.src = book.cover;
            imgEl.alt = `${book.title} cover`;
            imgEl.classList.add('book-cover');
            bookCard.appendChild(imgEl);
         }

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

         this.container.appendChild(bookCard);
      });
   }  

   initEventListeners() {
      this.showButton.addEventListener("click", () => {
         this.dialog.showModal();
      });

      this.form.addEventListener("submit", (e) => {
         e.preventDefault();
            
         this.addBookToLibrary();
         dialog.close()
         form.reset()
         this.displayBooks();
      });

      this.container.addEventListener("click", (e) => {
         const card = e.target.closest('.card');
         if (!card) return;

         const bookId = card.dataset.id;
         if (e.target.classList.contains('deleteBtn')) {
            this.library.removeBook(bookId);
            this.displayBooks();
         };

         if (e.target.classList.contains('changeReadBtn')) {
            this.library.toggleReadStatus(bookId);
            this.displayBooks();
         }
      });
   }

   addBookToLibrary() {
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;
      const pages = document.querySelector('#pages').value;
      const read = document.querySelector('#read').checked;
      const cover = document.querySelector("#cover");

      let coverURL;
      if (cover.files.length > 0) {
         coverURL = URL.createObjectURL(cover.files[0]);
      }

      const newBook = new Book(title, author, pages, read, coverURL);
      this.library.addBook(newBook);
      
      this.displayBooks();
   }
}

const myLibrary = new Library();
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, true, "./images/to_kill_a_mockingbird.jpg"));
myLibrary.addBook(new Book("1984", "George Orwell", 328, false, "./images/1984.jpg"));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", 279, true, "./images/pride_and_prejudice.jpg"));
myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false, "./images/the_great_gatsby.jpg"));
myLibrary.addBook(new Book("Moby-Dick", "Herman Melville", 585, true, "./images/moby_dick.jpeg"));
myLibrary.addBook(new Book("War and Peace", "Leo Tolstoy", 1225, false, "./images/war_and_peace.jpg"));

const displayController = new DisplayController(myLibrary);
displayController.displayBooks();