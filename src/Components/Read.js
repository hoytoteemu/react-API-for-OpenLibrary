
import React, { Component } from 'react'


class Read extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            read_author_name: '',
            read_cover_i: '',
            read_id_goodreads: '',
            read_isbn: '',
            read_title:'',
                      
        }
   this.DeleteBook = this.DeleteBook.bind(this)
    }
   DeleteBook(props){
       console.log('Press')
   }
render(props){
  let link = (this.props.goodreads === '404'
    ? console.log('Goodreads does not know of this title')
    :
    <div>
    <h2>Link:  </h2> <h3> <a href= { this.props.goodreads} target="blank">To Goodreads</a></h3>
    </div>)
  
  return (
    <div className="bookstodisplayDiv">
      <img src={this.props.img} alt='cover' className="CovrImage"></img>
      <div className="textnextToImg">
        <h2>Title: </h2>
        <h3> { this.props.title}</h3>
        <br></br>
        <h2>Author: </h2>
        <h3> { this.props.author_name}</h3>
        <br></br>
        
{link}
<button onClick={this.DeleteBook} className="prettyButton">Delete from list</button>
      </div>

    </div>
  )
    }
}
export default Read