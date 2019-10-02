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
            bookDeleted2:'invisible',
            div:"invisible",
            bookAdded2:'invisible',
            offset:1,
            page:1
        }
     
    }
    IncrementItem = () => {
        this.setState({ offset: this.state.offset + 12 ,
            page: this.state.page + 1});
        this.searchGET(this.state.suggestions)
    console.log(this.state.offset)  
    }
      DecrementItem = () => {
        this.setState({ offset: this.state.offset - 12,
            page: this.state.page - 1 });
        this.searchGET(this.state.suggestions)
      }
     


    handleStateOfdiv(){
        this.setState({
            div:"invisible",
            offset:1,
            page:1
        })
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
            bookAdded2:"bookAdded2",
            
        })
        
        setTimeout(() => {
            const newRead = {
                read_author_name:this.state.read_author_name,
                read_cover_i: this.state.read_cover_i,
                read_title: this.state.read_title, 
                read_subject: this.state.read_subject[0],
                read_read: this.state.read_read,
                key: this.state.key 
            };
            const books = Object.assign([], this.state.readingList);
        books.push(newRead);
            console.log(newRead)
            axios.post('http://localhost:4000/reads/add', newRead)
            .then(res => console.log(res.data));
            this.setState({
                readingList:books,
                read_author_name: '',
                read_cover_i: '',
                read_id_goodreads: '',
                read_isbn: '',
                read_title: '',
                read_subject:'',
                read_read:'',
               
                key : ''
             } )
             setTimeout(() => {
                 this.setState({
                    bookAdded2:"invisible",
                 })
             }, 1000);
        }, 100);
    
        
        
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
        
        
             
            }}, 100);}
            find = subject => {
              
         setTimeout(() => {
          let url ='http://openlibrary.org/subjects/'+this.state.suggestions.toLowerCase()+'.json?offset='+this.state.offset
          axios.get(url)
                  .then(response => {
                      this.setState({ Getsuggestions: response.data,
                        notYte:true,
                        div:"visibleDIVBOOK",
                      });
                  })
                  .catch(function (error){
                      console.log(error);
                  })
                  setTimeout(() => {
                   console.log(this.state.Getsuggestions)
             
        console.log(this.state.Getsuggestions.works)
        console.log(url)

    }, 2000);
              
        }, 100);
                   
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
        bookDeleted2:'bookDeleted2',
      //  key:this.state.readinglist._id,
        });
        
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
        bookDeleted2:'invisible',
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

                {item.read_read?
                             <h2><a href={openlibrary+item.read_read} target="blank" className="Getsuggup">Read <br/> {item.read_title.substring(0, 40)}</a></h2>:<h2>{item.read_title.substring(0, 40)}</h2>}

                <br></br><br></br>
                <h2>BY </h2>
                <br></br>
                <h2> { item.read_author_name}</h2>
                <br></br>
        <button onClick={this.handleDelete.bind(this, item.key)} className="prettyButtonGET">X</button>
        <button onClick={this.searchGET.bind(this, item.read_subject)} className="Getsugg"> {'More '+ item.read_subject.substring(0, 20)
  }</button>
              </div>
              <div className={this.state.bookDeleted2}>
            <h1>Book succesfully deleted</h1>
        </div>
        
        </div>
            </div>
        ))}
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
<div className={this.state.div}>
    <h2 className="suggestionsToTitle">{this.state.suggestions.replace(/_/g," ")+ ' ' +this.state.page}</h2>
    { (this.state.offset >12) ?[<button onClick={this.DecrementItem.bind(this)} className="prettyButtonGETUPLess">Less Books</button>, <button onClick={this.IncrementItem.bind(this)} className="prettyButtonGETUPMore">More Books</button>]
:<button onClick={this.IncrementItem.bind(this)} className="prettyButtonGETUPMore">More Books</button>}

  
  
    <button onClick={this.handleStateOfdiv.bind(this)} className="ButtonToreturnYuBackToyourList">X</button>
        {this.searchGET(this.props.item)}
    {this.state.notYte ===true ?
              

      this.state.Getsuggestions.works.map(item => {
                         
                         return  <div className="textnextToImgGetUP" key={item.key}>
                             
                          { item.cover_id ? <img  src={ coverImage+item.cover_id+'-L.jpg'}  alt='cover' className="CovrImageGetUP"></img>: null} 
                           
                            <div className="textOnImage"> 
                            {item.key?
                             <h2><a href={openlibrary+item.key} target="blank" className="Getsuggup">Read <br/> {item.title.substring(0, 40)}</a></h2>:item.title.substring(0, 40)}
                            <br></br><br></br>
                <h2>BY </h2>
                             <br></br><br></br>
                             <h2> { item.authors[0] ? item.authors[0].name:'No Author'}</h2>
                             <br></br>
                            
                             
                             <button onClick={this.handleButtonAndItsFunction.bind(this, item)} className="prettyButtonGETUP">Add to reading list</button>
                             <button onClick={this.searchGET.bind(this, item.subject[0])} className="Getsugg"> {'More '+ item.subject[0]
  }</button>
                             
 
                           </div>
                         </div>
                    
               }) :null}
                       </div>
                       <div className={this.state.bookAdded2}>
            <h1>Book succesfully added to reading list</h1>

        </div>
        </div>
    )
 }
}
}
 export default GetReadingList;