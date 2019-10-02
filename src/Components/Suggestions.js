import React, { Component } from 'react'
import axios from 'axios'
import '../Css/Suggestions.css';
let master = []

class Suggestions extends Component {
    constructor(){
        super()
        this.state = {
            getReadingList : [],
            error: null,
            getSubjects : [],
            isLoaded:false,
            subjectData:'',
           
        }

    }

    
    componentDidMount() {
        this.setState({ 
            getReadingList: [],
            getSubjects : [],
        });
        master = []
        axios.get('http://localhost:4000/reads/')
            .then(response => {
                this.setState({ getReadingList: response.data,
                    isLoaded:true 
                });
            })
            .catch(function (error){
                console.log(error);
            })
            setTimeout(() => {
                
                this.state.getReadingList.map(item => (
                    item.read_subject ? master.push(item.read_cover_i): console.log('no subject') ))
                    this.setState({getSubjects:master})
                    console.log(this.state.getSubjects);
            }, 1000);
        }
       
    render(){
        
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            
        return(
            
            <div className="BGIMAGE">
<h1 className="titleOfMyApp">Create your own reading list</h1>


      {this.state.getSubjects.map((value, index) => {
        return <div><img src={value}alt='cover' className="images"></img></div>
        
      })}

            </div>
        )
    }
}
}

export default Suggestions;