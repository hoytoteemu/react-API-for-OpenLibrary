import React, {
    Component
} from 'react';

import '../Css/App.css';
import axios from 'axios';
class App extends Component {
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
  
      //  const url = 'https://api.finna.fi/api/v1/search?lookfor=hyperion&type=AllFields&field[]=isbns&field[]=buildings&field[]=formats&field[]=id&field[]=languages&field[]=authors&field[]=onlineUrls&field[]=series&field[]=subjects&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi'
      const url = 'http://openlibrary.org/search.json?q=hyperion'
      
      const response = await axios.get(url)
     // const bookData = response.data.records[1].authors.primary
//  this.setState({bookData:bookData,
  //      isLoaded: true})

  const bookData = response.data
  this.setState({bookData:bookData,
  isLoaded: true})
       
       
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            console.log(this.state.bookData.docs[5].author_name[0])
     //  let books = this.state.bookData.map(item => ({ value: item.authors.primary }))
        return ( 
            <div>
            Hello Human
            <ul>
    
        </ul>

            <img src="http://covers.openlibrary.org/b/isbn/0-553-28368-5-L.jpg" alt="cover" />
    
            </div>
        )
    }
    }
}

export default App;