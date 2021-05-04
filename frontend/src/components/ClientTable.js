import React from 'react';

import { getClientLocations } from '../services/api';

class ClientTable extends React.Component {
  constructor() {
    super();

    this.state = {
      clients: []
    };
  }

  async componentDidMount() {
    const results = await getClientLocations();

    this.results = results.data;
    const clients = results.data;

    this.setState({ clients: clients });
    console.log(clients);
  }

  render() {
    return <div>will display clients</div>;
  }
}

export default ClientTable;
