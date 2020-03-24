import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css'

import Search from './components/Search';
import Library from './components/Library';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }));
      });
  };

  // MY CODE
  // handleBookUpdate = (book) => {
  //   // my code
  //   // let books = this.state.books;

  //   // suggestion
  //   let books = [...this.state.books];

  //   let i = books.findIndex((b) => b.id === book.id);

  //   if (i === -1) {
  //     // if book is not in the state, add it
  //     books.push(book);
  //   } else {
  //     // if book is in the state, remove it (if shelf is none) or update it
  //     book.shelf === 'none' ? books.splice(i, 1) : books[i] = book;
  //   };

  //   // update book in state
  //   this.setState(() => ({
  //     books: books
  //   }));

  //   // update book in database
  //   BooksAPI.update(book, book.shelf)
  //     .then(() => {
  //       console.log(`Updated book with ID: ${book.id}`);
  //     });
  // };

  // SUGGESTION
  handleBookUpdate = (book) => {
    this.setState((prevState) => {
      let books = [...prevState.books];

      let i = books.findIndex((b) => b.id === book.id);

      if (i === -1) {
        books.push(book);
      } else {
        book.shelf === 'none' ? books.splice(i, 1) : (books[i] = book);
      };

      BooksAPI.update(book, book.shelf)
        .then(() => {
          console.log(`Updated book with ID: ${book.id}`);
        });

      return { books };
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={(props) => (
          <Library {...props} books={books} handleBookUpdate={this.handleBookUpdate} />
        )} />
        <Route path='/search' render={(props) => (
          <Search {...props} books={books} handleBookUpdate={this.handleBookUpdate} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
