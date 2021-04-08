// LOGIN PAGINA 


import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import LoginForm from '../components/Elements/LoginForm'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: "",
        };
    
    this.handleLoginChange = this.handleLoginChange.bind(this)

    }
      
     
  handleLoginChange(value) {
    this.setState({logged_in: value});
  };
   

    render() {
        return(
            <div style={{ 
                backgroundImage: `url("https://i.imgur.com/f66MsTC.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
               
                }}>
                <div> 
               <div className='loginExplainer'>
                <div className='headerStyle'>
                    <div>Incidentradar</div>
                </div>
                <div className='introbarStyle'>
                    <div>Verzekeraar, projectontwikkelaar, buurtwacht of beveiliging?
                    De Incidentradar helpt sneller en adequater te reageren op incidenten om zo negatieve effecten te verminderen en preventie te verbeteren.  </div>
                    <br /><br />
                    <div>Gebruik de Incidentradar om..  </div>
                    <div>1. .. automatisch gewaarschuwd te worden als er iets bij je een van je adressen/in je buurt wat aan de hand is, waardoor je sneller kan reageren en eventuele kan schade beperken.</div>
                    <div>2. .. eenvoudig de incidentendata voor eigen inzichten te gebruiken. </div>
                    <div>3. .. (toekomst) locatie risico inzichten op basis van historische data te krijgen.</div>
                    <br /><br /><br /><br />
                    <div>De Incidentradar is op dit moment in Private Beta. Geïnteresseerd in een demo? Stuur een bericht naar koen@cartha.io. </div>
               </div> 
               <div className='loginHolder'>
                    <div>
                    Welkom terug!  
                    </div>
                    <div>
                    <LoginForm 
                    handleLoginChange = {this.handleLoginChange}/>
                </div>
                </div>
               </div>
               
            </div>
            </div>
        )
    };
}

export default Login