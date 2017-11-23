import React, { Component }  from 'react';

const BookItem = (props) => {
		const { book } = props;
		const imageLinks = book.imageLinks ? book.imageLinks.smallThumbnail : "./icons/book_Cover_404.gif";

		return(
			<li>
			  <div className="book">
			    <div className="book-top">
			      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks})` }}></div>
			      <div className="book-shelf-changer">
			        <select
								value={book.shelf}
							 	onChange={(e) => book.book.moveToShelf(book , e.target.value)}
								>
			          <option value={book.shelf} disabled>Move to...</option>
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
//onChange={(e) => book.moveToShelf(book , e.target.value)}
export default BookItem;
