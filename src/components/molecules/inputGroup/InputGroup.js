import { Component } from "../../../core";
import { todoList } from "../../../services/todoList/TodoList";
import '../../atoms/Button/Button';
import '../../atoms/input/Input';
import './inputGroup.scss'


export class InputGroup extends Component{
    constructor(){
        super();
        this.state = {
            inputValue: '',
            isLoading: false,
            error: false
        }
        
    }

    onSave(){
        if(this.state.inputValue){
            this.setState((state)=>{
                return{
                    ...state,
                    isLoading:true
                }
            })
            todoList.createTask({
                title: this.state.inputValue,
                isConnected: false
            }).then(()=>{
                // throw new Error('server is not avalable')
                this.setState((state)=>{
                    return{
                        ...state,
                        inputValue:''
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
        }}

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
        </div>
        ${this.state.isLoading?`
        <div class="spinner-border text-primary" role="status">
             <span class="visually-hidden">Loading...</span>
        </div>
        <div class="offcanvas-backdrop fade show"></div>`:''}
        ${this.state.error?`<div class="alert alert-danger" role="alert">
        ${this.state.error}
      </div>`:''}
        `
    }
}

customElements.define("my-input-group", InputGroup);