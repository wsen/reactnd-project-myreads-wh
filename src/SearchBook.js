import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from "./BookItem";

class SearchBook extends Component {

  state = {
    foundBooks: []
  }

  componentDidMount() {
    //BooksAPI.getAll().then(data => {
           //console.log(data);
    BooksAPI.getAll().then(foundBooks => {
      this.setState({ foundBooks });
    })
  }

  render() {
    //{this.state.showSearchPage ? ()}
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" />

            <div className="search-books-input-wrapper">

              <input type="text" placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.foundBooks.map((book) => (
                <BookItem key={book.title} book={book}/>
              ))}
            </ol>

          </div>
        </div>
    )
  }
}

export default SearchBook
