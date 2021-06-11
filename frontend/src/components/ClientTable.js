import React from 'react';
import { List, Table } from 'rsuite';
import { getClientLocations, removeClientLocation } from '../services/api';


const { Column, HeaderCell, Cell, Pagination } = Table;


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
    const client_fields = []
    const client_length = clients.length
    for (var i = 0; i < client_length; i++) {
      client_fields.push(clients[i].fields);
    }
    this.setState({ clients: client_fields });
    // console.log(results)
    // console.log(client_fields);
    
  }

  render() {
    return (
      <div className='tableShadow'>
        <Table
          height={480}
          width={800}
          data={this.state.clients}
          onRowClick={data => {
            console.log(data);
          }}
        >
          <Column width={200} fixed>
            <HeaderCell>Klantnaam</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={220} fixed>
            <HeaderCell>Adres</HeaderCell>
            <Cell dataKey="address" />
          </Column>

          <Column width={250} fixed>
            <HeaderCell>comment</HeaderCell>
            <Cell dataKey="description" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Actie</HeaderCell>

            <Cell>
              {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  <span>
                    <a onClick={handleAction}> Edit </a> |{' '}
                    <a onClick={handleAction}> Remove </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </div>
    );
  }
}

export default ClientTable;
