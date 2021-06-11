import React from 'react';

import IncidentList from './IncidentList';
import ClientTable from './ClientTable';
import Minimap from './Minimap';
import logo_regular from '../../src/assets/logo_regular.png';
//this will be the account dashboard

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  render() {
    return (
      <div style={{
        backgroundImage: `url("https://i.imgur.com/LBBgqfE.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
      }}>
        <div className='dashboardHolder'>
          <img src={logo_regular} alt="Logo" className='logoDashboard'/>
        </div>
        <div>
        
        </div>
        <div className="incidentWidth">
            <IncidentList />
        </div>
        <div className="minimapPosition">
          <Minimap />
        </div>
        <div className="clientWidth">
          <ClientTable />
        </div>
      </div>
    );
  }
}

export default Dashboard;
