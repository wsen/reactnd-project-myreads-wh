import React from 'react'
import './App.css'
import BooksAPI from './BooksAPI'

class Book extends React.Component {
  state = {
    currentlyReading: "false",
    wantToRead: "false",
    read: "false"
  }

  componentDidMount() {
    BooksAPI.search("harry potter",3).then((books) => {
        console.log(books)
        //this.setState({ books })
    })
  }
}

export default Book
