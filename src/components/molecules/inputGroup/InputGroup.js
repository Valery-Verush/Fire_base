import { Component } from "../../../core";
import { todoList } from "../../../services/todoList/TodoList";
import '../../atoms/Button/Button';
import '../../atoms/input/Input';


export class InputGroup extends Component{
    constructor(){
        super();
        this.state = {
            inputValue: '',
        }

    }

    onSave(){
        if(this.state.inputValue){
            todoList.createTask({
                title: this.state.inputValue,
                isConnected: false
            })
        }
    }

    onInput(evt){
        this.setState((state)=>{
            return{
                ...state,
                inputValue: evt.detail.value
            }
        })
    }

    componentDidMount(){
        this.addEventListener('save-task', this.onSave)
        this.addEventListener('custom-input', this.onInput)

    }

    render(){
        return`<div class='input-group mb-3'>
          <my-input value='${this.state.inputValue}' placeholder='Add a new task' type='text'></my-input>
          <my-button eventtype='save-task' content="Save" classname="btn btn-outline-primary"></my-button>
        </div>`
    }
}

customElements.define("my-input-group", InputGroup);