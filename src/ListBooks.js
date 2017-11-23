
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookShelf from "./BookShelf";
//import PropTypes from 'prop-types';

class ListBooks extends Component {
  render() {
    /* !! more functional approach instead of compact statements like: !!
    const currentlyReadingList = this.props.books.filter(book => book.shelf==="currentlyReading");
    */

    const { books } = this.props

    const filter   = books => shelf => books.filter(book => book.shelf === shelf)

    const filterBy = filter(books)

    const current = filterBy('currentlyReading')
    const read    = filterBy('read')
    const want    = filterBy('wantToRead')

    //console.log( read )

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf books={current} title="Currently reading" moveToShelf={books.moveToShelf} />
          <BookShelf books={want} title="Want to Read" moveToShelf={books.moveToShelf} />
          <BookShelf books={read} title="Reading" moveToShelf={books.moveToShelf} />
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
