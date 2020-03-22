import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bookshelf from './Bookshelf';

class Library extends Component {
  render() {
    const { books, handleBookUpdate } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title='Currently Reading' books={books.filter((book) => book.shelf === 'currentlyReading')} handleBookUpdate={handleBookUpdate} />
            <Bookshelf title='Want to Read' books={books.filter((book) => book.shelf === 'wantToRead')} handleBookUpdate={handleBookUpdate} />
            <Bookshelf title='Read' books={books.filter((book) => book.shelf === 'read')} handleBookUpdate={handleBookUpdate} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Library;