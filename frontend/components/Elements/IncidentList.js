
import React from 'react'
import { List, FlexboxGrid, Icon } from 'rsuite';


// testdata voor list
const data = [
    {
      title: 'Brand gemeld',
      icon: 'image',
      creator: 'Brandweer',
      date: '2017.10.13 14:50',
      peak: 3223,
      peakRaise: 433,
      uv: 433,
      uvRaise: 33
    },
    {
      title: 'Brand gemeld, auto in brand, vermoedelijk aangestoken',
      icon: 'image',
      creator: 'Brandweer',
      date: '2017.10.13 14:50',
      peak: 3223,
      peakRaise: 238,
      uv: 238,
      uvRaise: 28
    },
    {
      title: 'Loods in Brand, nog niet onder controle',
      icon: 'image',
      creator: 'Brandweer',
      date: '2017.10.13 14:50',
      peak: 4238,
      peakRaise: -239,
      uv: 239,
      uvRaise: 29
    },
    {
      title: 'Ondersteuning bij brand in loods',
      icon: 'image',
      creator: 'Ambulance',
      date: '2017.10.13 14:50',
      peak: 4238,
      peakRaise: 2321,
      uv: 921,
      uvRaise: 91
    },
    {
      title: 'Brand gemeld in loods',
      icon: 'image',
      creator: 'Politie',
      date: '2017.10.13 14:50',
      peak: 2321,
      peakRaise: 1321,
      uv: 321,
      uvRaise: 132
    }
  ];
  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
  };
  
  const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5
  };
  
  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500
  };
  
  const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500
  };
  
  class IncidentList extends React.Component {
    constructor() {
      super();
      this.renderRaise = this.renderRaise.bind(this);
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
        <List hover>
          {data.map((item, index) => (
            <List.Item key={item['title']} index={index}>
              <FlexboxGrid>
                {/*icon*/}
                <FlexboxGrid.Item colspan={2} style={styleCenter}>
                  <Icon
                    icon={item['icon']}
                    style={{
                      color: 'darkgrey',
                      fontSize: '1.5em'
                    }}
                  />
                </FlexboxGrid.Item>
                {/*base info*/}
                <FlexboxGrid.Item
                  colspan={6}
                  style={{
                    ...styleCenter,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden'
                  }}
                >
                  <div style={titleStyle}>{item['title']}</div>
                  <div style={slimText}>
                    <div>
                      <Icon icon="user-circle-o" />
                      {' ' + item['creator']}
                    </div>
                    <div>{item['date']}</div>
                  </div>
                </FlexboxGrid.Item>
                {/*peak data*/}
                <FlexboxGrid.Item colspan={6} style={styleCenter}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={slimText}>Top Value</div>
                    <div style={dataStyle}>{item['peak'].toLocaleString()}</div>
                  </div>
                  {this.renderRaise(item['peakRaise'])}
                </FlexboxGrid.Item>
                {/*uv data*/}
                <FlexboxGrid.Item colspan={6} style={styleCenter}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={slimText}>UV</div>
                    <div style={dataStyle}>{item['uv'].toLocaleString()}</div>
                  </div>
                  {this.renderRaise(item['uvRaise'])}
                </FlexboxGrid.Item>
                {/*uv data*/}
                <FlexboxGrid.Item
                  colspan={4}
                  style={{
                    ...styleCenter
                  }}
                >
                  {/* link naar kaart   */}
                  <a href="#">View</a> 
                  <span style={{ padding: 5 }}>|</span>
                  {/* link naar adres in tabel */}
                  <a href="#">Customer</a>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      );
    }
  }
  
  export default IncidentList
  