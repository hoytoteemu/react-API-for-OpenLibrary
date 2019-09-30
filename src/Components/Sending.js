import React, {Component} from 'react'
import axios from 'axios'
import '../Css/GetReadingList.css';
import '../Css/Sending.css';

let coverImage = 'http://covers.openlibrary.org/b/id/'
let openlibrary = 'https://openlibrary.org'
let master = []

      
class GetReadingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
          notYte:false,
            error: null,
            bookData: null,
            isLoaded: false,
            readingList: [],
            info:'invisible',
            suggestions:'',
            Getsuggestions:[],
key:null
        }
     
    }
   

    searchGET(subject){
     
setTimeout(() => {
  if(subject===undefined){
    console.log('not yet')

  }else{
    console.log('wohuu')
  this.setState({
    suggestions:subject.replace(/ .*/,''),
    Getsuggestions:[]
  })
  console.log(this.state.suggestions)
  setTimeout(() => {
    
        this.find(this.state.suggestions)
       
},100);    


     
    }}, 1000);}
    find = subject => {
      
 setTimeout(() => {
  let url ='http://openlibrary.org/subjects/'+this.state.suggestions.toLowerCase()+'.json?'
  axios.get(url)
          .then(response => {
              this.setState({ Getsuggestions: response.data,
                notYte:true 
              });
          })
          .catch(function (error){
              console.log(error);
          })
          setTimeout(() => {
           console.log(this.state.Getsuggestions)
     
console.log(this.state.Getsuggestions.works)
          }, 1000);
      
}, 1000);
           
    }

  
    componentDidMount(subject) {

  
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
           // console.log(this.state.readingList)
    return(
        
        <div className="columncountGRL">
        { this.state.readingList.map((item) => (
                         
              <div className="textnextToImgGet">
             { item.read_cover_i ? <img  src={ item.read_cover_i}  alt='cover' className="CovrImageGet"></img>: null} 
              
               <div className="textOnImage"> 
                <h2> { item.title}</h2>
                <br></br>
              <button onClick={this.searchGET.bind(this, item.read_subject)} className="Getsugg"> { item.read_subject.replace(/ .*/,'')
  }</button>
               
                <br></br>
              </div>
              <div className={this.state.info}>
            <h1>Book succesfully deleted</h1>
        </div>
        </div>
           
        ))}
    {this.searchGET(this.props.item)}
    {this.state.notYte ===true ?
      this.state.Getsuggestions.works.map(item => {
                         
                         return <div className="textnextToImgGet">
                          { item.cover_id ? <img  src={ coverImage+item.cover_id+'-L.jpg'}  alt='cover' className="CovrImageGet"></img>: null} 
                           
                            <div className="textOnImage"> 
                             <h2> { item.title}</h2>
                            
                             <br></br>
                           </div>
                           <div className={this.state.info}>
                         <h1>Book succesfully deleted</h1>
                         </div>
                         </div>
                         
                       }) :null}
        </div>
    )
 }
}
}
 export default GetReadingList;