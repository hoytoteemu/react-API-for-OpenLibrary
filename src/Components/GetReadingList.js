import React, {Component} from 'react'
import axios from 'axios'

import '../Css/GetReadingList.css';

let openlibrary = 'https://openlibrary.org'
let coverImage = 'http://covers.openlibrary.org/b/id/'

class GetReadingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bookData: null,
            isLoaded: false,
            readingList: [],
            info:'invisible',
            key:'',
            read_author_name: '',
            read_cover_i: '',
            read_id_goodreads: '',
            read_isbn: '',
            read_title:'',
            read_subject:'',
            read_read:'',
            search:'',
            notYte:false,
            suggestions:'',
            Getsuggestions:[],

        }
     
    }

    handleButtonAndItsFunction(item){
        console.log(`Form submitted:`);
        console.log(`Book key: ${item.key}`);
        console.log(`Book title: ${item.title}`);
        console.log(`Book Cover number: ${ coverImage+item.cover_id+'-L.jpg'}`);
        console.log(`Book subject: ${item.subject}`);
        console.log(`Book readingLink: ${item.key}`);
        console.log(`Book author name: ${item.authors[0].name}`);
        
        this.setState({
            read_author_name: item.authors[0].name,
            read_cover_i:coverImage+item.cover_id+'-L.jpg',
            read_title:item.title,
            read_subject:item.subject,
            read_read:item.key,
            key:item.key,
            info:"visibleDIV",
        
        })
        setTimeout(() => {
            const newRead = {
                read_author_name:this.state.read_author_name,
                read_cover_i: this.state.read_cover_i,
                read_title: this.state.read_title, 
                read_subject: this.state.read_subject,
                read_read: this.state.read_read,
                key: this.state.key 
            };
            console.log(newRead)
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
                info:"invisible",
                key : ''
             } )
        }, 1000);
    
        
        
    }

    searchGET(subject){
     
        setTimeout(() => {
          if(subject===undefined){
            console.log('not yet')
        
          }else{
            console.log('wohuu')
          this.setState({
            suggestions:subject.replace(/ /g,"_"),
            notYte:false,
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
        
    

   
    similarBooks = (subject) => {
      console.log(subject)
      
      this.setState({
          search:subject,
      
      })
      setTimeout(() => {
          const newRead = {
              search : this.state.search 
          };
         // console.log(newRead)
          axios.post('http://localhost:4000/Suggestions/add', newRead)
          .then(res => console.log(res.data));
          this.setState({
              search : ''
           } )
      }, 1000);
  
     }






      handleDelete = (key) => {
        const index = this.state.readingList.findIndex((list)=> {
            this.setState({key:list._id})
            return (list.key === key);
            
        })
           const books = Object.assign([], this.state.readingList);
           books.splice(index,1);
           console.log(books)
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
                {item.read_read?
                             <h2><a href={openlibrary+item.read_read} target="blank" className="Getsuggup">Read {item.read_title}</a></h2>:null}
        
        <br></br>
        <button onClick={this.handleDelete.bind(this, item.key)} className="prettyButtonGET">X</button>
        <button onClick={this.searchGET.bind(this, item.read_subject)} className="Getsugg"> {'Subject '+ item.read_subject
  }</button>
              </div>
              <div className={this.state.info}>
            <h1>Book succesfully added</h1>
        </div>
        </div>
            </div>
        ))}
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>

        {this.searchGET(this.props.item)}
    {this.state.notYte ===true ?
      this.state.Getsuggestions.works.map(item => {
                         
                         return  <div className="textnextToImgGet" key={item.key}>
                             
                          { item.cover_id ? <img  src={ coverImage+item.cover_id+'-L.jpg'}  alt='cover' className="CovrImageGet"></img>: null} 
                           
                            <div className="textOnImage"> 
                            <h2> { item.title}</h2>
                            <br></br>
                <h2>BY </h2>
                             <br></br>
                             <h2> { item.authors[0].name}</h2>
                             <br></br>
                            
                             {item.key?
                             <h2><a href={openlibrary+item.key} target="blank" className="Getsuggup">Read {item.title}</a></h2>:null}
                             <button onClick={this.handleButtonAndItsFunction.bind(this, item)} className="prettyButton">Add to reading list</button>
                           </div>
                         </div>
                         
                       }) :null}
        </div>
    )
 }
}
}
 export default GetReadingList;