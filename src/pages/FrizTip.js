import React from "react"
import axios from "axios"
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone }  from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Header from "../components/Header"
import DoInput from "../components/DoInput"

import {  BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"


class FrizTip extends React.Component {

    state = {
        isLoading:true,
        data : []
    }

    componentDidMount() {

        axios.get("https://frizmee-server.herokuapp.com/friztips").then( response => {
            this.setState( { data : response.data, isLoading : false } )
        }   )



    }

    addTip = () => {
        let title = prompt("Pour quel produit ?")
        
        let tip = prompt("Et ton conseil ?")
        
        let author = prompt("Tu es ?")

axios.post("https://frizmee-server.herokuapp.com/friztips/create", {
    title : title,
    tip : tip,
    author : author
}).then(response => this.setState({ data : response.data}))

    }

    onChangeTip = (id, tip) => {

        let newTip = prompt("Tu peux amender le tip !", tip)

        axios.post("/friztips/update", {
        id: id,
        tip: newTip
        })

    }

    renderTable = () => {

        let columns = [
        {
            dataField : "title",
            text : "Produit",
            sort : true,
            filter : textFilter({ placeholder : "Produit" })
        },
        {
            dataField : "tip",
            text : "Conseils",
            sort : true,
            filter : textFilter({ placeholder : "Conseils" })
        },
        {
            dataField : "author",
            text : "De",
            sort : true,
            filter : textFilter({ placeholder : "De" })
        },


        ]

        return ( <BootstrapTable 
            columns={columns}
            data={this.state.data}
            keyField='_id'
            noDataIndication={ () => "Aucune donnée à afficher" }
            filter={filterFactory()}
        /> )

    }


    render() {

            return <><Header page="FrizTip" />
            <div className="container">
            {this.state.isLoading && <span>Wait for it...</span>}
            <button className="friztip-button" onClick={this.addTip}>Ajouter un conseil</button>
            {!this.state.isLoading && this.renderTable()}
        </div>
        </>
        

    }


}

export default FrizTip