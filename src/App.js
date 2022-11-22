import { Component } from "./core";
import "./components/molecules/inputGroup/InputGroup";
import { todoList } from "./services/todoList/TodoList";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoading: false,
    };
  }

  getTasks(){
    todoList.getTasks().then((data) =>{
      this.setState((state) => {
        return {
          ...state,
          tasks: data,
        };
      });
    })
  }

  saveTask = (evt) =>{
    todoList.createTask({ ...evt.detail, isCompleted: false}).then(() =>{
        this.getTasks()
      })
  }

  deleteTask =  (id) => {
    todoList.deleteTask(id).then(() =>{
      this.getTasks()
    })
  }

  onClick = (evt) => {
    const target = evt.target;
    if(target.closest(".delete-action")) {
      const data = target.dataset;
      this.deleteTask(data.id)
    }
  }

  componentDidMount() {
    this.getTasks();
    this.addEventListener('save-task', this.saveTask)
    this.addEventListener('click', this.onClick)
  }

  componentWillUnmount() {
    this.removeEventListener('save-task', this.saveTask)
    this.removeEventListener('click', this.onClick)
  }


  render() {
    return `
        <div class='container mt-5'>
          <my-input-group></my-input-group>
          <ul class="list-group">
            ${this.state.tasks.map((item) => (`
              <li class="list-group-item">
                <div class="form-check d-flex justify-content-between align-items-center">
                  <div>
                      <input class="form-check-input" type="checkbox" ${item.isCompleted ? 'checked' : ''} id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        ${item.title}
                      </label>
                    </div>
                    <div class='d-flex'>
                      <button data-id="${item.id}" class="btn btn-danger btn-sm m-2 delete-action">Delete</button>
                      <button data-id="${item.id}" class="btn btn-sm btn-primary m-2 edit-action">Edit</button>
                    </div>
              </div>
            </li>
            `)).join(' ')}
          </ul>
        </div>
        `;
  }
}

customElements.define("my-app", App);

