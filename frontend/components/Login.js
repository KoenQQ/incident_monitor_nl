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
                    <div>Buurtwacht, projectontwikkelaar, beveiliging of verzekeraar?
                    De incidentradar helpt alle eigen locaties in de gaten te houden en geeft 
                        een waarschuwing als er iets bij de locatie aan de hand is. </div>
                    <br /><br />
                    <div>Gebruik de incidentradar om..  </div>
                    <div>1. .. automatisch gewaarschuwd te worden als er iets bij je een van je adressen/in je buurt wat aan de hand is, waardoor je sneller kan reageren en eventuele kan schade beperken.</div>
                    <div>2. .. eenvoudig de incidentendata voor eigen inzichten te gebruiken. </div>
                    <div>3. .. (toekomst) locatie risico inzichten op basis van historische data te krijgen.</div>
                    
               </div> 
               <div className='loginHolder'>
                    <div>
                    Hello! 
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