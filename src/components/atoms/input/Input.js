import { Component } from "../../../core";
import { debounce } from "../../../utils/debounce";

export class Input extends Component{
    constructor(){
        super();
        this.state = {
            value: '',
        }

        this.onInput = this.onInput.bind(this)
    }

    componentWillUpdate(name, _,newValue){
        if(name === 'value'){
            this.setState((state)=>{
                return{
                    ...state,
                    value: newValue
                }
            })
        }
    }

    static get observedAttributes(){
        return['type', 'placeholder', 'value', 'name']
    }
    onInput(evt){
        this.dispatch('custom-input', {value: evt.target.value});

    }


    componentDidMount(){
        this.addEventListener('change', this.onInput )
    }
    
    render(){
        return`
        <input  
        name="${this.props.name}"
        type="${this.props.type}" 
        class="form-control" 
        placeholder='${this.props.placeholder}'
        value='${this.props.value}'>
    `
    }
}

customElements.define('my-input', Input)