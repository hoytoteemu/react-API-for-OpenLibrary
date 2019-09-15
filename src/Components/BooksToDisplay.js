import React from 'react'

const BooksToDisplay = (props) =>{
let link= (props.goodreads ==='404'? 'Goodreads does not know of this title' :  <a href={props.goodreads}>To Goodreads</a>)
    return(
        <div className="bookstodisplayDiv">
   
         <h2>Title: {props.title}</h2>
         <h2>Author: {props.author_name}</h2>
         <h2>ISBN: {props.isbn}</h2>
     {link}
         <img src={props.img} alt='cover'></img>

        </div>
    )
}
export default BooksToDisplay