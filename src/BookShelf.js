import React from 'react'
import PropTypes from 'prop-types'

import BookItem from './BookItem'

const BookShelf = (props) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
         {(props.books.filter(b => b.shelf === props.shelf.id).map( book =>
          <BookItem
            key={book.id}
            book={book}
            shelves={props.shelves}
            moveToShelf={props.moveToShelf}
          />
          ))}
        </ol>
      </div>
    </div>
);

// in this way it would be rejectet by eslint
//TODO: Needs to be more specified
BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  shelf: PropTypes.object.isRequired,
  moveToShelf: PropTypes.func.isRequired
};

export default BookShelf
