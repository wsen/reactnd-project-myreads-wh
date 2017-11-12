import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from "./BookItem";

class SearchBook extends Component {

  state = {
    //foundBooks: [],
    searchedBooks: [],
    query: ""
  }

/*
  componentDidMount() {
    //BooksAPI.getAll().then(data => {
           //console.log(data);
    BooksAPI.getAll().then(foundBooks => {
      //this.setState({ foundBooks });
      this.setState( state => { state.foundBooks = foundBooks });
    })
  }
*/

   searchBooks = query => {
     if(query)
      BooksAPI.search(query,10).then( result => {
        let searchedBooks = Array.from(result);
        this.setState( state => {
          state.searchedBooks = searchedBooks;
        });
     })
     this.setState( state => ({ query: query }));
   }

  render() {
    //{this.state.showSearchPage ? ()}
    return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" />

            <div className="search-books-input-wrapper">
               <input
                 type="text"
                 placeholder="Search by title or author"
                 value={this.state.query}
                 onChange={ e => {this.searchBooks(e.target.value)}}
               />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchedBooks.map((book) => (
                <BookItem key={book.id} book={book}/>
              ))}
            </ol>

          </div>
        </div>
    )
  }
}

export default SearchBook
