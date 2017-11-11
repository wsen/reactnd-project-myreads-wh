
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookItem from "./BookItem";
//import PropTypes from 'prop-types';

class ListBooks extends Component {
  render() {
    const currentlyReadingList = this.props.books.filter(book => book.shelf==="currentlyReading");
		const wantToReadList = this.props.books.filter(book => book.shelf==="wantToRead");
		const readList = this.props.books.filter(book => book.shelf==="read");

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
              {shelf.id === "currentlyReading" && currentlyReadingList.map((book) => (
                <BookItem key={book.id} book={book} onMoveToShelf={this.props.onMoveToShelf}/>
              ))}
              {shelf.id === "wantToRead" && wantToReadList.map((book) => (
                <BookItem key={book.id} book={book} onMoveToShelf={this.props.onMoveToShelf}/>
              ))}
              {shelf.id === "read" && readList.map((book) => (
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
