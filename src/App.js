import { Component } from "./core";
import "./components/molecules/inputGroup/InputGroup";
import { todoList } from "./services/todoList/TodoList";
import "./components/molecules/Task/Task";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isLoading: false,
    };
  }

  getTasks() {
    todoList.getTasks().then((data) => {
      this.setState((state) => {
        return {
          ...state,
          tasks: data.map((item) => ({ ...item, isEditting: false })),
        };
      });
    });
  }

  saveTask = (evt) => {
    todoList.createTask({ ...evt.detail, isCompleted: false }).then(() => {
      this.getTasks();
    });
  };

  deleteTask = (id) => {
    todoList.deleteTask(id).then(() => {
      this.getTasks();
    });
  };

  onClick = (evt) => {
    const target = evt.target;
    if (target.closest(".delete-action")) {
      const data = target.dataset;
      this.deleteTask(data.id);
    }
  };

  updateTask= ({detail})=>{
      todoList.updateTask(detail.id, {title: detail.title, isCompleted:false}).then(() => {
        this.getTasks();
      });
  }

  componentDidMount() {
    this.getTasks();
    this.addEventListener("save-task", this.saveTask);
    this.addEventListener("edit-task", this.updateTask);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("save-task", this.saveTask);
    this.removeEventListener("edit-task", this.updateTask);
    this.removeEventListener("click", this.onClick);
  }

  render() {
    return `
        <div class='container mt-5'>
          <my-input-group></my-input-group>
          <ul class="list-group">
            ${this.state.tasks
              .map(
                (item) => `
              <my-task 
              id="${item.id}" 
              title="${item.title}" 
              isCompleted="${item.isCompleted}"
              ></my-task>
            `
              )
              .join(" ")}
          </ul>
        </div>
        `;
  }
}

customElements.define("my-app", App);
