import React from 'react';
import { List, Table } from 'rsuite';
import { getIncidentHits, getClientLocations } from '../services/api';

const { Column, HeaderCell, Cell, Pagination } = Table;


class IncidentList extends React.Component {
  constructor() {
    super();
    this.renderRaise = this.renderRaise.bind(this);
    this.state = {
      user: '',
      hits: []
    };
  }

  async componentDidMount() {
    const results = await getIncidentHits();

    this.results = results.data;
    const hitzone = results.data;
    const es = ['ambu', '']
    const filtered_hitzone = hitzone.filter(function(item){
      return es.indexOf(item.emergency_service)}) 
    filtered_hitzone.sort((d1, d2) => new Date(d2.pub_date).getTime() - new Date(d1.pub_date).getTime());
    this.setState({ hits: filtered_hitzone });
    console.log(filtered_hitzone);
  }

  renderRaise(number) {
    const isPositive = number > 0;
    const isNegative = number < 0;

    return (
      <span
        style={{
          paddingLeft: 15,
          color: isNegative ? 'red' : 'green'
        }}
      >
        <span>{isPositive ? '+' : null}</span>
        <span>{number}</span>
      </span>
    );
  }

  render() {
    return (
      <div className='tableShadow'>
        <Table
          height={1070}
          width={1050}
          data={this.state.hits}
          onRowClick={data => {
            console.log(data);
          }}
        > 
          <Column width={600} resizable>
            <HeaderCell>Incident</HeaderCell>
            <Cell dataKey="comment" />
          </Column>

          <Column width={100} fixed>
            <HeaderCell>Hulpdienst</HeaderCell>
            <Cell dataKey="emergency_service" />
          </Column>

          <Column width={160} fixed>
            <HeaderCell>klant</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={180} fixed>
            <HeaderCell>datum</HeaderCell>
            <Cell dataKey="pub_date" />
          </Column>

        </Table>
      </div>
    );
  }
}

export default IncidentList;
