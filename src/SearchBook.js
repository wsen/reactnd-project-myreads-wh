import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';

class SearchBook extends React.Component {
    state = {
      searchedBooks: [],
      booksIDOnShelf: [],
      booksOnShelf: [],
      query: "",
      keywords: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }

    static propTypes = {
      books:        PropTypes.array,
      moveToShelf:  PropTypes.func.isRequired
    };

    componentDidMount(){
     const { books: booksOnShelf } = this.props
     const booksIDOnShelf = booksOnShelf.map(book => book.id);

     this.setState({ booksOnShelf, booksIDOnShelf })
    }


   searchBooks = (query, booksID, booklist) => {
     if(query)
      BooksAPI.search(query,10).then( result => {
        let searchedBooks = Array.from(result).map(book=> {
          if (!booksID.includes(book.id)) {
            book.shelf = "";
          } else {
            let bookShelf = booklist.filter(bookOnShelf => bookOnShelf.id === book.id)[0].shelf;
            book.shelf = bookShelf;
          }
          return book;
        });
        this.setState({ searchedBooks });
     })
    this.setState({ query });
   }

   searchKeywords = (e, books, booklist) => {
    let query = e.target.innerText;
    this.setState({ query: query });
    this.searchBooks(query,books, booklist);
   }

   updateBookSearch = (book, shelf) => {
     this.setState( prev => ({
       searchedBooks: prev.searchedBooks.filter( b => b.id !== book.id )
     }));
     this.props.moveToShelf(book, shelf);
   };

  render() {
    const  {booksIDOnShelf, booksOnShelf } = this.state;
    return(
			<div className="search-books">
			  <div className="search-books-bar">
			  	<Link to="/" className="close-search">Close</Link>
			    <div className="search-books-input-wrapper">
			      <input
			      	id="searchInput"
			      	type="text"
			      	placeholder="Search by title or author"
			      	value={this.state.query}
			      	onChange={ e => {this.searchBooks(e.target.value, booksIDOnShelf, booksOnShelf)}}
			      	/>
			    </div>
			  </div>
			  <div className="search-keywords">
			  	{this.state.keywords.map( (keyword,index) => (
			  		<p key={index} className="search-keyword" onClick={e => this.searchKeywords(e, booksIDOnShelf, booksOnShelf)}>{keyword}</p>
			  	))}
			  </div>
			  {this.state.query && <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.state.searchedBooks.length > 0 && (this.state.searchedBooks.map((book) => (
			    	    <BookItem
                   key={book.id}
                   book={book}
                   moveToShelf={this.updateBookSearch}
                />
			    	)))}
			    </ol>
			  </div>}
			</div>
		)
  }
}

export default SearchBook
