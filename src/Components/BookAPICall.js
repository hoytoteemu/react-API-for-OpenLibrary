import React, {
    Component
} from 'react';
import BooksToDisplay from './BooksToDisplay.js'
import '../Css/BookAPICall.css';

let Togoodreads = 'https://www.goodreads.com/book/show/'
let coverImage = 'http://covers.openlibrary.org/b/isbn/'
let genericBookImage = 'https://www.pinclipart.com/picdir/big/90-903549_book-png-free-clip-art-images-of-bookworms.png'
class BookAPICall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            bookData: null,
            toSearch: "",
            isLoaded: false,
            searchTerm:""
        }
        
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event){
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
        this.setState({
            [name]:value
        })
        console.log(value.length)
    setTimeout(() => {
        if(value.length>=5){
            this.find(value)
           }
    },1000);   
        
    }

                
        find = searchTerm => {
        const url = `http://openlibrary.org/search.json?q=${searchTerm}`        
     
     fetch(url)
    .then(result => result.json())
    .then(data =>{
        console.log(data.docs)
        this.setState({bookData: data.docs,
            isLoaded: true })
    })
    
    /*
     const response =  axios.get(url)
      const bookData = response.data
      this.setState({bookData:bookData,
      isLoaded: true})*/
          // console.log(bookData)
      }

   componentDidMount() {
  this.find(this.state.searchTerm)
    }      
   

    render() {
        
       
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            
           
        return ( 
            <div className="InputOfTodos">
               <input 
                name = "toSearch"
                type = "text"
                placeholder="Search for a book or author"
                className="Searchterms"
                value = {this.state.toSearch}
                onChange = {this.handleChange}
                
                />
                <div className="columnCount">
            { this.state.bookData.map(item => (
            <ul className="BooksToDisplay">
              <BooksToDisplay title={item.title} author_name={item.author_name}
               isbn={ item.isbn  ?item.isbn[0] : 'No ISBN'}
               goodreads={ item.id_goodreads ? Togoodreads + item.id_goodreads[0] : '404'}
               
               img={  item.isbn ? coverImage +item.isbn[0] +'-L.jpg': genericBookImage } />
            </ul>
            ))}
            </div>
                </div>
        )
    }
    }
}

export default BookAPICall