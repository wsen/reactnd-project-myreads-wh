import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks  from './ListBooks'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
     books: [
       /*
      {
        "title": "To Kill a Mockingbird",
        "authors": "Harper Lee",
        "imageLinks": {
          "smallThumbnail" : "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
          "thumbnail" : ""},
        "shelf": "currentlyReading"
      }
      */
     ],
     shelves: [
       {"id": "currentlyReading", "name": "Currently Reading"},
       {"id": "wantToRead", "name": "Want to Read"},
       {"id": "read", "name":"Read"}
     ]
  }

  moveToShelf = (book, shelf) => {
    if(this.state.shelf !== book.shelf){
      BooksAPI.update(book, shelf);
      book.shelf = shelf;

      this.setState((state) => ({
        books: (state.books.filter(b => b.id !== book.id).concat([book]))
      }));
    }
  }

  componentDidMount() {
    //!! setState instead of mutating state !!
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            moveToShelf={this.moveToShelf}
            shelves={this.state.shelves}
          />
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBook
            books={this.state.books}
            moveToShelf={this.moveToShelf}
            shelves={this.shelves}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
