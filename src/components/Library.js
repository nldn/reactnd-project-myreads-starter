import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

import Bookshelf from './Bookshelf';

class Library extends Component {
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

  render() {
    const { books } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title='Currently Reading' books={books.filter((book) => book.shelf === 'currentlyReading')} />
            <Bookshelf title='Want to Read' books={books.filter((book) => book.shelf === 'wantToRead')} />
            <Bookshelf title='Read' books={books.filter((book) => book.shelf === 'read')} />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default Library;