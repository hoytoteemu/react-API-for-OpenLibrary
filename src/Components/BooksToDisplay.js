import React from 'react'

const BooksToDisplay = (props) => {
  let link = (props.goodreads === '404'
    ? console.log('Goodreads does not know of this title')
    :
    <div>
    <h2>Link:  </h2> <h3> <a href= { props.goodreads} target="blank">To Goodreads</a></h3>
    </div>)
  
  return (
    <div className="bookstodisplayDiv">
      <img src={props.img} alt='cover' className="CovrImage"></img>
      <div className="textnextToImg">
        <h2>Title: </h2>
        <h3> { props.title}</h3>
        <br></br>
        <h2>Author: </h2>
        <h3> { props.author_name}</h3>
        <br></br>

{link}
<button>Add to reading list</button>
      </div>

    </div>
  )
}
export default BooksToDisplay