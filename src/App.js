import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks  from './ListBooks'
import SearchBook from './SearchBook'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
       {
         "id": "currentlyReading",
         "name": "Currently Reading"
       },
       {
         "id": "wantToRead",
         "name": "Want to Read"
       },
       {
         "id": "read",
         "name":"Read"
       }
     ]
  }

  moveToShelf = (e,book) => {
    let value = e.target.value;
    book.shelf = value;
    this.setState(this.state);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState( state => {
        state.books = books
      });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books} shelves={this.state.shelves} onMoveToShelf={this.moveToShelf}
          />
        )}/>
        <Route exact path="/search" component={SearchBook}/>
      </div>
    )//return
  }//render

}//class App

export default App
