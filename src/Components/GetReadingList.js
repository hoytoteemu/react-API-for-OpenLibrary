import React, {Component} from 'react'
import axios from 'axios'
import Read from './Read.js'
import '../Css/GetReadingList.css';

class GetReadingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bookData: null,
            isLoaded: false,
            readingList: []
            
        }
        this.handleDataCallback = this.handleDataCallback.bind(this)
    
    }
    
   

    handleDataCallback (postItem) {

        console.log(postItem)
        let currentPostList = this.state.readingList
        currentPostList.pop(postItem)
        this.setState({
            readingList: currentPostList
        })
      }



    componentDidMount() {
        axios.get('http://localhost:4000/reads/')
            .then(response => {
                this.setState({ readingList: response.data,
                    isLoaded:true 
                });
            })
            .catch(function (error){
                console.log(error);
            })
            setTimeout(() => {
                console.log(this.state.readingList)
     
            }, 100);
                       
      
        }        

       
    render(){
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
        
    return(
        <div className="columncountGRL">
        { this.state.readingList.map(item => (
                item.read_cover_i ? 
                <ul className="BooksToDisplay">
                   <Read title={item.read_title} author_name={item.read_author_name}
                     isbn={ item.read_isbn  ?item.read_isbn : 'No ISBN'}
                    
                    goodreads={ item.read_id_goodreads ?  item.read_id_goodreads : '404'}
                    _id = {item._id}
                    didHandleRemove={this.handlePostRemove}
                    dataCallback={this.handleDataCallback}
                    img={  item.read_cover_i ? item.read_cover_i: null } />
                    
                 </ul>
                 :null
            ))}
        
        
        </div>
    )
 }
}
}
 export default GetReadingList;