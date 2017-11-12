import React, { Component }  from 'react';

class BookItem extends Component {
  //8 const imageLinks = book.imageLinks ? book.imageLinks.smallThumbnail : "./icons/book_Cover_404.gif";
            //25 <div className="book-authors">{book.authors.map(author => (<p key={author}>{author}</p>))}</div>
	render(){
		const { book } = this.props;

		return(
			<li>
			  <div className="book">
			    <div className="book-top">
			      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
			      <div className="book-shelf-changer">
			        <select onChange={(e)=> this.props.onMoveToShelf(e,book)} value={book.shelf}>
			          <option value="" disabled>Move to...</option>
			          <option value="currentlyReading">Currently Reading</option>
			          <option value="wantToRead">Want to Read</option>
			          <option value="read">Read</option>
			          <option value="none">None</option>
			        </select>
			      </div>
			    </div>
			    <div className="book-title">{book.title}</div>
			    <div className="book-authors">{book.authors || "none"}</div>
			  </div>
			</li>
		)
	}
}

export default BookItem;
