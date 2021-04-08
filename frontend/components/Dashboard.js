import React from 'react'
import IncidentList from './Elements/IncidentList.js'


//this will be the account dashboard

class Dashboard extends React.Component {


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