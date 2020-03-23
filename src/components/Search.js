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
    const { books } = this.props;

    this.setState({ query });

    if (query.length > 0) {
      BooksAPI.search(query)
        .then((res) => {
          if (res && !('error' in res)) {
            res = res.map((book) => {
              let b = books.filter((b1) => b1.id === book.id);
              
              return b.length > 0 ? b[0] : book;
            });
  
            this.setState({ booksArray: res });
          } else {
            this.setState({ booksArray: [] });
          };
        });
    } else {
      this.setState({ booksArray: [] });
    };
  };

  render() {
    const { query, booksArray } = this.state;
    const { handleBookUpdate } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              name='query'
              value={query}
              placeholder="Search by title or author" 
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className="search-books-results">
          <ol className="books-grid">
            {!('error' in booksArray) ? booksArray.map((book) => (
              <li key={book.id}>
                <Book book={book} handleBookUpdate={handleBookUpdate} />
              </li>
            )) : ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;