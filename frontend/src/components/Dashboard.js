import React from 'react';

import IncidentList from './IncidentList';
import ClientTable from './ClientTable';

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
      <div>
        <div className="incidentWidth">
          <div>
            <IncidentList />
          </div>
        </div>
        <div className="clientWidth">
          <ClientTable />
        </div>
      </div>
    );
  }
}

export default Dashboard;
