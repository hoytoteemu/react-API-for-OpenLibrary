import React, {Component} from 'react'
import axios from 'axios'
import '../Css/GetReadingList.css';

class GetReadingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bookData: null,
            isLoaded: false,
            readingList: [],
            info:'invisible',
key:null
        }
     
    }
   
      handleDelete = (key) => {
        const index = this.state.readingList.findIndex((list)=> {
            this.setState({key:list._id})
            return (list.key === key);
            
        })
           const books = Object.assign([], this.state.readingList);
           books.splice(index,1);
          // console.log(books)
    this.setState({readingList:books,
      //  key:this.state.readinglist._id,
        info:"visibleDIV"});
        
        setTimeout(() => {
             const URL = 
              'http://localhost:4000/reads/delete-read/'+this.state.key
          
             
         
      axios.delete(URL)
      .then((res) => {
          console.log('Book successfully deleted!')
      }).catch((error) => {
          console.log(error)
      })  
      this.setState({
          info:'invisible',
          key:null
      })
      }, 1000)
      
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
            //    console.log(this.state.readingList)
     
            }, 100);
                       
      
        }        

       
    render(){
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
           // console.log(this.state.readingList)
    return(
        
        <div className="columncountGRL">
        { this.state.readingList.map((item) => (
            
              <div className="bookstodisplayDivG" key={item.key}>
       
              
              <div className="textnextToImgGet">
              <img  src={item.read_cover_i} alt='cover' className="CovrImageGet"></img>
               <div className="textOnImage"> 
                <h2> { item.read_title}</h2>
                <br></br>
                <h2>BY </h2>
                <br></br>
                <h2> { item.read_author_name}</h2>
                <br></br>
                
                {item.read_id_goodreads === '404'
            ? console.log(item.read_id_goodreads)
            :
            <div>
            <h3> <a href={item.read_id_goodreads} target="blank" className="linkToGoodreads">To Goodreads</a></h3>
            </div>}
        
        
        <button onClick={this.handleDelete.bind(this, item.key)} className="prettyButtonGET">X</button>
            
              </div>
              <div className={this.state.info}>
            <h1>Book succesfully deleted</h1>
        </div>
        </div>
            </div>
        ))}
        
        </div>
    )
 }
}
}
 export default GetReadingList;