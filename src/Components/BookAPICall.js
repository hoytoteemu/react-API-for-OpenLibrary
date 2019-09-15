import React, {
    Component
} from 'react';
import BooksToDisplay from './BooksToDisplay.js'
import '../Css/BookAPICall.css';
import axios from 'axios';
let Togoodreads = 'https://www.goodreads.com/book/show/'
let coverImage = 'http://covers.openlibrary.org/b/isbn/'
class BookAPICall extends Component {
    constructor() {
        super()
        this.state = {
            error: null,
            bookData: null,
            toSearch: "",
            isLoaded: false
        }
    }
    async componentDidMount() {
  
      const url = 'http://openlibrary.org/search.json?q=hyperion'
      
      const response = await axios.get(url)
     // const bookData = response.data.records[1].authors.primary
//  this.setState({bookData:bookData,
  //      isLoaded: true})

  const bookData = response.data
  this.setState({bookData:bookData,
  isLoaded: true})
       
       
    }
    renderItems() {
        return this.state.bookData.docs.map(item => (
            <li>
              <BooksToDisplay title={item.title} author_name={item.author_name} />
            </li>
          ));
      }

    render() {
        
       
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            console.log(this.state.bookData.docs)
           
        return ( 
            <div>
          <ul>{this.renderItems()}</ul>;
            <BooksToDisplay 
            
             title={this.state.bookData.docs[0].title}
             author_name={this.state.bookData.docs[0].author_name}
             isbn={ this.state.bookData.docs[0].isbn  ?this.state.bookData.docs[0].isbn[0] : 'No ISBN'}
             goodreads={ this.state.bookData.docs[0].id_goodreads ? Togoodreads + this.state.bookData.docs[0].id_goodreads[0] : '404'} 
             img={  this.state.bookData.docs[0].isbn ? coverImage + this.state.bookData.docs[0].isbn[0] +'-L.jpg': '404' }
             />
                </div>
        )
    }
    }
}

export default BookAPICall