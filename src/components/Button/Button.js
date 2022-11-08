import { Component } from "../../core";
import './Button.scss'

export class Button extends Component{

    registerEvents(){
        this.addEventListener('click', ()=>{
            this.dispatchEvent(this.props.eventType)
        })
    }

    static get observedAttributes(){
        return ['content', 'classname', 'eventType'];
    }

    render (){
        const {content, classname} = this.props;
        return `
        <button type="button" class="btn ${classname}">${content}</button>
        `
    }

}

customElements.define('my-button', Button)