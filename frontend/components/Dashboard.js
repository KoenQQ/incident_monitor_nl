import React from 'react'
import IncidentList from './Elements/IncidentList.js'
import Axios from 'axios'

//this will be the account dashboard

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          user: ''
        };
    }



    render(){
       return(
            <div>
                <h2>Dashboard</h2>
                <div>
                    <IncidentList/>
                </div>
            </div>
            
       )  
    }

}

export default Dashboard 