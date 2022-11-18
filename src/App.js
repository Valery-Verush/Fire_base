import { Component } from "./core";
import "./components/molecules/inputGroup/InputGroup"
import { todoList } from "./services/todoList/TodoList";
export class App extends Component {

  constructor(){
    super();
    this.state = {
      tasks: [],
      isLoading: false,
      error: false
    }

  }
  componentDidMount(){
    this.setState((state)=>{
      return{
          ...state,
          isLoading:true
      }
  })
    todoList.getTasks().then((data) =>{
      this.setState((state)=>{
        return{
          ...state,
          tasks: data
        }
      })
    }).catch((error) => {
      this.setState((state)=>{
          return{
              ...state,
              error: error.message,
          }
      })
  }).finally(()=>{
      this.setState((state)=>{
          return{
              ...state,
              isLoading:false
          }
      })
  })
  }

  render() {
    return `
    <div class='container mt-5'>
        <my-input-group></my-input-group>
        <ul class="list-group">
        ${this.state.tasks.map((item)=>{return`
        <li class="list-group-item">
        <div class="form-check d-flex justify-content-between align-items-center">
        <div>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
        ${item.title}
        </label>
        </div>
        <div class='d-flex'>
        <my-button content="Delete" classname="btn btn-danger btn-sm"></my-button>
        <my-button content="Update" classname="btn btn-primary btn-sm"></my-button>
        </div>
        </div>
        </li>
        `}).join('')}
        </ul>
        </div>
      </div>
      ${this.state.isLoading?`
        <div class="spinner-border text-primary" role="status">
             <span class="visually-hidden">Loading...</span>
        </div>
        <div class="offcanvas-backdrop fade show"></div>`:''}
        ${this.state.error?`<div class="alert alert-danger" role="alert">
        ${this.state.error}
      </div>`:''}
       `;
  }
}

customElements.define("my-app", App);