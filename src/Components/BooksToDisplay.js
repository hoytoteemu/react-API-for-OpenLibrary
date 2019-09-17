import React from 'react'

const BooksToDisplay = (props) =>{
let link= (props.goodreads ==='404'? 'Goodreads does not know of this title' :  <a href={props.goodreads} target="blank">To Goodreads</a>)
    return(
        <div className="bookstodisplayDiv">
            <img src={props.img} alt='cover' className="CovrImage"></img>
   <div className="textnextToImg">
         <h2>Title: </h2><h3> {props.title}</h3><br></br>
         <h2>Author: </h2><h3> {props.author_name}</h3><br></br>
         <h2>ISBN: </h2><h3> {props.isbn}</h3><br></br>
     <h2>Link: </h2><h3> {link}</h3><br></br>
     
     </div>
         

        </div>
    )
}
export default BooksToDisplay