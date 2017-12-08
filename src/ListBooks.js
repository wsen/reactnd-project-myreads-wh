import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from "./BookShelf";

class ListBooks extends React.Component {

  // in this way it would be rejectet by eslint
  //TODO: Needs to be more specified
  static propTypes = {
    books:        PropTypes.array,
    moveToShelf:  PropTypes.func.isRequired,
    shelves:      PropTypes.array.isRequired
  }

  render() {
    { /*
    // !! more functional approach instead of compact statements like: !!
    // const currentlyReadingList = this.props.books.filter(book => book.shelf==="currentlyReading");

    const { books } = this.props

    const filter   = books => shelf => books.filter(book => book.shelf === shelf)

    const filterBy = filter(books)

    const current = filterBy('currentlyReading')
    const read    = filterBy('read')
    const want    = filterBy('wantToRead')
    */ }

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>Werner&#39;s Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <div>
            { /* Iterate particulary over all shelves  */ }
            {(this.props.shelves.filter(s => s.id !== 'none')).map((shelf, index) =>
              <BookShelf
                key={index}
                shelf={shelf}
                books={this.props.books}
                shelves={this.props.shelves}
                moveToShelf={this.props.moveToShelf}
              />
            )}

            { /*
            <BookShelf books={want} title="Want to Read" moveToShelf={books.moveToShelf} />
            <BookShelf books={read} title="Reading" moveToShelf={books.moveToShelf} />
            // Problem: Handles just the book array here, without moveToShelf funtionallity
            */}

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
