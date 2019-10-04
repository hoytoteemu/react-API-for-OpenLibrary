
import React, { Component }  from 'react'
import axios from 'axios'
import uniqueId from 'react-html-id';
import '../Css/BookToDisplay.css';
class BooksToDisplay extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            key:'',
            read_author_name: '',
            read_cover_i: '',
            read_id_goodreads: '',
            read_isbn: '',
            read_title:'',
            read_subject:'',
            read_read:'',
            bookAdded:'invisible',

        }
        uniqueId.enableUniqueIds(this)
        this.handleButtonAndItsFunctioncall = this.handleButtonAndItsFunctioncall.bind(this)
    }
    handleButtonAndItsFunctioncall(props){
        console.log(`Form submitted:`);
        console.log(`Book key: ${this.props.id}`);
        console.log(`Book title: ${this.props.title}`);
        console.log(`Book Cover number: ${this.props.img}`);
        console.log(`Book goodreads id: ${this.props.goodreads}`);
        console.log(`Book isbn: ${this.props.isbn}`);
        console.log(`Book subject: ${this.props.subject}`);
        console.log(`Book readingLink: ${this.props.readingLink}`);
        console.log(`Book author name: ${ this.props.author_name}`);
        
        this.setState({
            read_author_name: this.props.author_name,
            read_cover_i: this.props.img,
            read_id_goodreads: this.props.goodreads,
            read_isbn: this.props.isbn,
            read_title:this.props.title,
            read_subject:this.props.subject,
            read_read:this.props.readingLink,
            key:this.props.id,
            bookAdded:"bookAdded",
        
        })
        setTimeout(() => {
            const newRead = {
                read_author_name: this.state.read_author_name[0],
                read_cover_i: this.state.read_cover_i,
                read_id_goodreads: this.state.read_id_goodreads,
                read_isbn: this.state.read_isbn,
                read_title: this.state.read_title, 
                read_subject: this.state.read_subject,
                read_read: this.state.read_read,
                key : this.state.key 
            };
           // console.log(newRead)
            axios.post('http://localhost:4000/reads/add', newRead)
            .then(res => console.log(res.data));
            this.setState({
                read_author_name: '',
                read_cover_i: '',
                read_id_goodreads: '',
                read_isbn: '',
                read_title: '',
                read_subject:'',
                read_read:'',
                bookAdded:"invisible",
                key : ''
             } )
        }, 1000);
    
        
        
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
       <div className={this.state.bookAdded}>
            <h1>Book succesfully added to reading list</h1>
        </div>
      <img src={this.props.img} alt='cover' className="CovrImage"></img>
      <div className="textnextToImg">
        <h2>Title: </h2>
        <h3> { this.props.title.substring(0, 35)}</h3>
        <br></br>
        <h2>Author: </h2>
        <h3> { this.props.author_name}</h3>
        <br></br>
        
{link}
<button onClick={this.handleButtonAndItsFunctioncall} className="prettyButton">Add to reading list</button>
      </div>
     
    </div>
  )
    }
}
export default BooksToDisplay