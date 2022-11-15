import { Component } from "../../../core";

export class Input extends Component{
    constructor(){
        super();
        this.state = {
            value: '',
        }
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

    // onChange(){
    //     this.dispatch('')
    // }

    // componentDidMount(){
    //     this.addEventListener('input', this.onChange)
    // }
    static get observedAttributes(){
        return['type', 'placeholder', 'value']
    }
    render(){
        return`
        <input  
        type="${this.props.type}" 
        class="form-control" 
        placeholder=${this.props.placeholder}
        value=${this.props.value}>`
    }
}

customElements.define('my-input', Input)