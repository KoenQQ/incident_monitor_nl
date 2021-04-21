import { getClientLocations } from "../../api/Api";
import React from 'react'


class ClientTable extends React.Component {
    constructor() {
        super();
        this.state = {
            clients: []
        }
    }



    async componentDidMount() {
        await getClientLocations()
            .then(results => {
                this.results = results.data
                const clients = results.data
                this.setState({clients: clients})
                console.log(clients)
            });
    }


    render() {
        return(
            <div>will display clients</div>
        )
    }




}

export default ClientTable