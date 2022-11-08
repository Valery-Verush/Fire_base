export class Component extends HTMLElement {
    constructor(){
        super();
        this.state = {};
        this.props = {};

    }

    setState(callback){
        this.state = callback(this.state);
        this.innerHTML = this.render().trim().replaceAll(/true|false/gi, '').replaceAll(',','');
        
    }

    connectedCallback(){
        this.innerHTML = this.render().trim().replaceAll(/true|false/gi, '').replaceAll(',','');
        this.ComponentDidMount();
        this.registerEvents()
    }

    disconnectedCallback(){
        this.ComponentWillUnMount()
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.componentWillUpdatae(name, oldValue, newValue);
        this.getAttributeNames().forEach(()=>{
            this.props[name] =this.getAttribute(name);
        })
    }

    dispatch(){
        this.dispatchEvent(new CustomEvent(type, {bubbles:true, detail: props}))
    }



    registerEvents(){}
    ComponentDidMount(){}
    componentWillUpdatae(){}
    ComponentWillUnMount(){}
    render(){}

}