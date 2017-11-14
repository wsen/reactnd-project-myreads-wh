import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks  from './ListBooks'
import SearchBook from './SearchBook'

class App extends React.Component {
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
    let shelf = e.target.value;
    this.setState(state => {
      if(!this.state.books.map(book => book.id).includes(book.id)){
          book.shelf = shelf;
          let copyBooks = Object.assign([], this.state.books).concat(book);
          this.setState({books: copyBooks});
      } else if (shelf === "none") {
        book.shelf = shelf;
        let books = this.state.books.filter(book => book.shelf !== shelf);
        this.setState({books: books});
      } else {
        book.shelf = shelf;
        this.setState(this.state);
       }
     });
    BooksAPI.update(book, shelf);
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
        <Route path="/search" render={({ history }) => (
          <SearchBook
            books={this.state.books}
            onMoveToShelf={(e,book) => {
              this.moveToShelf(e,book);
          }}/>
        )}
        />
      </div>
    )//return
  }//render

}//class App
/*78: history.push("/"); //uncomment, if route should go back to home */

export default App
