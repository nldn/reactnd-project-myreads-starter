import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

import Book from './Book';

class Search extends Component {
  state = {
    query: '',
    booksArray: []
  };

  handleChange = (query) => {
    this.setState(() => ({
      query: query.trim()
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { books } = this.props;

    BooksAPI.search(this.state.query)
      .then((response) => {
        response = response.map((book) => {
          let b = books.filter((b1) => b1.id === book.id);

          if (b.length > 0) {
            return b[0];
          };

          return book;
        });

        this.setState(() => ({
          booksArray: response
        }));
      });
  };

  render() {
    const { query, booksArray } = this.state;
    const { handleBookUpdate } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                name='query'
                value={query}
                placeholder="Search by title or author" 
                onChange={(e) => this.handleChange(e.target.value)}
              />
            </form>

          </div>
        </div>
        
        <div className="search-books-results">
          <ol className="books-grid">
            {booksArray.map((book) => (
              <li key={book.id}>
                <Book book={book} handleBookUpdate={handleBookUpdate} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;