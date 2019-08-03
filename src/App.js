import React from "react";
import AddButton from "./AddButton";
import Task from "./Task";
import DoInput from "./DoInput";
import axios from "axios";
import { format, compareAsc } from "date-fns";

class App extends React.Component {
  state = {
    isLoading: true,
    tasks: null,
    newToDo: "",
    quantity: "",
    trySearch: "",
    createRequest: false,
    hideUnpinned: false
  };

  checkToDo = async index => {
    this.setState({ isLoading: true });
    await axios
      .post("http://localhost:3001/pin", {
        id: this.state.tasks[index]._id
      })
      .then(response => {
        this.setState({ tasks: response.data, isLoading: false });
      });
  };

  eat = async index => {
    this.setState({ isLoading: true });

    await axios
      .post("http://localhost:3001/update", {
        id: this.state.tasks[index]._id
      })
      .then(response => {
        this.setState({ tasks: response.data, isLoading: false });
      });
  };

  addTaskandNumber = async () => {
    this.setState({ isLoading: true });

    await axios
      .post("http://localhost:3001/create", {
        title: this.state.newToDo,
        quantity: this.state.quantity !== "" ? this.state.quantity : 1
      })
      .then(response => {
        const newTasks = [...this.state.tasks];
        newTasks.push(response.data);
        this.setState({
          tasks: newTasks,
          isLoading: false,
          newToDo: "",
          quantity: ""
        });
      });
  };

  deleteToDo = async index => {
    this.setState({ isLoading: true });
    await axios
      .post("http://localhost:3001/delete", {
        id: this.state.tasks[index]._id
      })
      .then(response => {
        this.setState({ tasks: response.data, isLoading: false });
      });
  };

  displayDate = index => {
    console.log(this.state.tasks[index]);
  };

  renderToDos = () => {
    let taskArray = [];

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (
        this.state.trySearch.length === 0 ||
        (this.state.trySearch.length > 0 &&
          this.state.tasks[i].title
            .toLowerCase()
            .includes(this.state.trySearch.toLowerCase()))
      ) {
        taskArray.push(
          <Task
            check={() => {
              this.checkToDo(i);
            }}
            quantity={this.state.tasks[i].quantity}
            key={this.state.tasks[i]._id}
            theme={this.state.tasks[i].pinned ? "pinned" : "unpinned"}
            text={this.state.tasks[i].title}
            date={format(this.state.tasks[i].date, "Congelé le DD/MM/YY")}
            delete={e => {
              this.deleteToDo(i);
            }}
            eat={e => {
              this.eat(i);
            }}
            displayDate={e => this.displayDate(i)}
          />
        );
      }
    }

    let unpinned = taskArray.filter(todo => todo.props.theme === "unpinned");
    let pinned = taskArray.filter(todo => todo.props.theme === "pinned");

    let newArray;

    if (this.state.hideUnpinned === false) {
      newArray = [...unpinned, ...pinned];
    } else {
      newArray = [...pinned];

      if (newArray.length === 0) {
        newArray = (
          <div className="list-container empty-list">
            Rien de spécial dans le congélo :({" "}
          </div>
        );
      }
    }

    return newArray;
  };

  render() {
    return (
      <div className="container">
        <header>
          <div>
            <h1>Frizmee !!!</h1>
            <h2>L'appli pour gérer ton frigo</h2>
            {this.state.tasks && (
              <h3>
                (On a {this.state.tasks.length} produits différents dans le
                congel !)
              </h3>
            )}
          </div>
        </header>

        <div>
          {/* Loader just for tasks */}
          {this.state.isLoading && (
            <div className="list-container">Loading tasks...</div>
          )}
          {!this.state.isLoading && <ul>{this.renderToDos()}</ul>}
          <div>Cliquez sur le produit pour l'épingler</div>
          <div>
            Appuyer sur la <i className="fas fa-times" /> pour effacer
            définitivement de la liste
          </div>
          <AddButton
            className="hide-done"
            text={
              this.state.hideUnpinned
                ? "Afficher tout le congélo"
                : "Afficher la sélection"
            }
            onClick={() => {
              this.setState({ hideUnpinned: !this.state.hideUnpinned });
            }}
          />
          <DoInput
            placeholder="Miam, un nouveau plat..."
            theme="do-input"
            quantityTheme="quantity-input"
            quantityPH="Quantité"
            value={this.state.newToDo}
            quantity={this.state.quantity}
            onInput={value => {
              this.setState({ newToDo: value });
            }}
            onQuantity={value => {
              this.setState({ quantity: value });
            }}
          />
        </div>
        <AddButton
          text="Ajouter un produit"
          onClick={() => {
            this.addTaskandNumber();
          }}
        />
        <div>
          <DoInput
            visibility="hidden"
            theme="search-input"
            quantityTheme="hidden"
            placeholder="Chercher un produit existant..."
            onInput={value => {
              this.setState({
                trySearch: value
              });
            }}
          />
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await axios.get("http://localhost:3001/").then(response => {
      this.setState({ tasks: response.data, isLoading: false });
    });
  }
}

export default App;
