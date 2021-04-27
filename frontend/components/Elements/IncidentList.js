
import React from 'react'
import { List, FlexboxGrid, Icon } from 'rsuite';
import { getUser, getIncidentHits } from '/Users/koendebrauw/Documents/app_dev/incident_monitor_nl_1/frontend/api/Api.js'


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

  const data2 = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];

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
      this.state = {
          user: '',
          hits: []
      }
    }

    async componentDidMount()  {
        await getIncidentHits()
            .then(results => { 
            this.results = results.data
            const hitzone = results.data
            this.setState({hits: hitzone})
            });
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
        return(
        <div className= 'listStyle'>
          <List bordered hover >
            {this.state.hits.map((item) => (
              <List.Item key={item['pub_date']} >
                {item.monitorcode} <br></br>
                {item.pub_date}
              </List.Item>
            ))}
          </List>
        </div>
      );
      }
    }

//     render() {
//       return (
//         <List hover>
//           {data.map((item) => (
//             <List.Item key={item['title']} index={index}>
//               <FlexboxGrid>
//                 {/*icon*/}
//                 <FlexboxGrid.Item colspan={2} style={styleCenter}>
//                   <Icon
//                     icon={item['icon']}
//                     style={{
//                       color: 'darkgrey',
//                       fontSize: '1.5em'
//                     }}
//                   />
//                 </FlexboxGrid.Item>
//                 {/*base info*/}
//                 <FlexboxGrid.Item
//                   colspan={6}
//                   style={{
//                     ...styleCenter,
//                     flexDirection: 'column',
//                     alignItems: 'flex-start',
//                     overflow: 'hidden'
//                   }}
//                 >
//                   <div style={titleStyle}>{item['monitorcode']}</div>
//                   <div style={slimText}>
//                     <div>
//                       <Icon icon="user-circle-o" />
//                       {' ' + item['emergency_service']}
//                     </div>
//                     <div>{item['pub_date']}</div>
//                   </div>
//                 </FlexboxGrid.Item>
//                 {/*peak data*/}
//                 <FlexboxGrid.Item colspan={6} style={styleCenter}>
//                   <div style={{ textAlign: 'right' }}>
//                     <div style={slimText}>Top Value</div>
//                     <div style={dataStyle}>{item['address'].toLocaleString()}</div>
//                   </div>
//                   {this.renderRaise(item['peakRaise'])}
//                 </FlexboxGrid.Item>
//                 {/*uv data*/}
//                 <FlexboxGrid.Item colspan={6} style={styleCenter}>
//                   <div style={{ textAlign: 'right' }}>
//                     <div style={slimText}>UV</div>
//                     <div style={dataStyle}>{item['uv'].toLocaleString()}</div>
//                   </div>
//                   {this.renderRaise(item['uvRaise'])}
//                 </FlexboxGrid.Item>
//                 {/*uv data*/}
//                 <FlexboxGrid.Item
//                   colspan={4}
//                   style={{
//                     ...styleCenter
//                   }}
//                 >
//                   {/* link naar kaart [switch naar map view, met zoom niveau & op basis van location]   */}
//                   <a href="#">View on map</a> 
//                   <span style={{ padding: 5 }}>|</span>
//                   {/* link naar adres in tabel */}
//                   <a href="#">Customer</a>
//                 </FlexboxGrid.Item>
//               </FlexboxGrid>
//             </List.Item>
//           ))}
//         </List>
//       );
//     }
//   }
  
  export default IncidentList
  