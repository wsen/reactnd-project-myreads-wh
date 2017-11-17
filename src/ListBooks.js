
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookItem from "./BookItem";
//import PropTypes from 'prop-types';

class ListBooks extends Component {
  render() {
    /* !! more functional approach instead of compact statements like: !!
    const currentlyReadingList = this.props.books.filter(book => book.shelf==="currentlyReading");
    */

    const { books } = this.props

    const filter   = books => shelf => books.filter(book => book. shelf === shelf)
    const filterBy = filter(books)

    const current = filterBy('currentlyReading')
    const read    = filterBy('read')
    const want    = filterBy('wantToRead')

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        {this.props.shelves.map(shelf => (
          <div key={shelf.id} className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {shelf.id === "currentlyReading" && current.map((book) => (
                <BookItem key={book.id} book={book} onMoveToShelf={this.props.onMoveToShelf}/>
              ))}
              {shelf.id === "wantToRead" && want.map((book) => (
                <BookItem key={book.id} book={book} onMoveToShelf={this.props.onMoveToShelf}/>
              ))}
              {shelf.id === "read" && read.map((book) => (
                <BookItem key={book.id} book={book} onMoveToShelf={this.props.onMoveToShelf}/>
              ))}
              </ol>
            </div>
          </div>
        ))}
        </div>
        <div className="open-search">
          <Link className="open-search-link" to="/search">
            <Link to="/search">Add a book</Link>
          </Link>
        </div>
      </div>
    )
  }
}


export default ListBooks
