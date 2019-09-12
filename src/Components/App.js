import React, {
    Component
} from 'react';

import '../Css/App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            fetch: [],
        }
    }
    componentDidMount() {

        fetch('https://api.finna.fi/api/v1/search?lookfor=hyperion&type=AllFields&field[]=isbns&field[]=buildings&field[]=formats&field[]=id&field[]=languages&field[]=authors&field[]=onlineUrls&field[]=series&field[]=subjects&sort=relevance%2Cid%20asc&page=1&limit=20&prettyPrint=false&lng=fi')
        .then(results => {
            return results.json()

        }).then(data => {
           
           return(
                 this.setState({fetch: data}),
                 console.log(this.state.fetch)
                 
           )
            
            
         
         
        })

    }
    render() {
        let etch = this.state.fetch['records']
     
        console.log(etch)
        /*const keys = Object.keys(etch)
                 for (const key of keys) {
                   console.log(key)
                 }*/
        return ( 
            <div>
            Hello Human
        
            <img src="http://covers.openlibrary.org/b/isbn/0-553-28368-5-L.jpg" alt="cover" />
    
            </div>
        )
    }

}

export default App;