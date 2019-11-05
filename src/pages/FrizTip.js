import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Header from "../components/Header";

class FrizTip extends React.Component {
  state = {
    isLoading: true,
    data: []
  };

  componentDidMount() {
    axios
      .get("https://frizmee-server.herokuapp.com/friztips")
      .then(response => {
        this.setState({ data: response.data, isLoading: false });
      });
  }

  onChangeTip = (id, tip) => {
    let newTip = prompt("Tu peux amender le tip !", tip);

    axios.post("/friztips/update", {
      id: id,
      tip: newTip
    });
  };

  onDelete = (e, id) => {
    if (window.confirm("Supprimer ce produit de la liste ?")) {
      axios
        .post("https://frizmee-server.herokuapp.com/friztips/delete", {
          id: id
        })
        .then(response => {
          this.setState({ data: response.data });
        });
    }
  };

  addTip = () => {
    let title = prompt("Pour quel produit ?");

    if (title === null) {
      return;
    }

    let tip = prompt("Et ton conseil ?");

    if (tip === null) {
      return;
    }

    let author = prompt("Tu es ?");

    if (author === null) {
      return;
    }

    if (title === "" || tip === "" || author === "") {
      return alert("Saisie incomplète. Merci de recommencer!");
    }

    axios
      .post("https://frizmee-server.herokuapp.com/friztips/create", {
        title: title,
        tip: tip,
        author: author
      })
      .then(response => this.setState({ data: response.data }));
  };

  // tipFormatter = (cell, row) => {
  //   return  <div onClick={() => window.alert(cell) }>{cell}</div>
  // }

  titleFormatter = (cell, row) => {
    return " " + cell.toUpperCase();
  };

  buttonFormatter = (cell, row) => {
    return (
      <i
        className="fas fa-trash-alt mini-table-icon"
        onClick={e => this.onDelete(e, row._id)}
      ></i>
    );
  };

  renderTable = () => {
    console.log(this.state.data);

    let columns = [
      {
        dataField: "button",
        text: "",
        formatter: this.buttonFormatter,
        headerStyle: () => {
          return { width: "20px" };
        }
      },
      {
        dataField: "title",
        text: "Produit",
        formatter: this.titleFormatter,
        filter: textFilter({ placeholder: "Produit" })
      },
      {
        dataField: "tip",
        text: "Conseils",
        filter: textFilter({ placeholder: "Conseils" })
      },
      {
        dataField: "author",
        text: "De",
        filter: textFilter({ placeholder: "De" }),
        headerStyle: () => {
          return { width: "50px" };
        }
      }
    ];

    return (
      <BootstrapTable
        columns={columns}
        data={this.state.data}
        keyField="_id"
        classes="tips-table-row"
        noDataIndication={() => "Aucune donnée à afficher"}
        filter={filterFactory()}
      />
    );
  };

  render() {
    return (
      <>
        <Header page="FrizTip" />
        <div className="container">
          {this.state.isLoading && <span>Wait for it...</span>}
          <button className="friztip-button" onClick={this.addTip}>
            Ajouter un conseil
          </button>
          {!this.state.isLoading && this.renderTable()}
        </div>
      </>
    );
  }
}

export default FrizTip;
