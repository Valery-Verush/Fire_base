import { Component } from "../../../core";
import "./Button.scss";

export class Button extends Component {
  componentDidMount() {
    this.addEventListener("click", () => {
      this.dispatch(this.props.eventtype);
    });
  }

  static get observedAttributes() {
    return ["content", "classname", "eventtype", 'type'];
  }

  render() {
    const { content, classname } = this.props;
    return `
        <button type="${this.props.type}" class="btn ${classname}">${content}</button>
        `;
  }
}

customElements.define("my-button", Button);
