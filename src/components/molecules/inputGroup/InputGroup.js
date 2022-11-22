import { Component } from "../../../core";
import { todoList } from "../../../services/todoList/TodoList";
// import "../../atoms/Button/Button";
// import "../../atoms/input/Input";
import "./inputGroup.scss";

export class InputGroup extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    const task = {};
    const data = new FormData(evt.target);
    data.forEach((value, key) => {
      task[key] = value;
    });
    this.dispatch(this.props.type, task);
  };

  componentDidMount() {
    this.addEventListener("submit", this.onSubmit);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.onSubmit);
  }

  static get observedAttributes() {
    return ["type"];
  }

  render() {
    return `
    <form class='input-group mb-3'>
        <input  
            name="title"
            type="text" 
            class="form-control" 
            placeholder='Add a new task'
        />
            <button type="submit" class="btn btn btn-outline-primary">Save</button>
    </form>
        `;
  }
}

customElements.define("my-input-group", InputGroup);
