export class Component extends HTMLElement {
  constructor() {
    super();
    this.state = {};
    this.props = {};
  }

  setState(callback) {
    this.state = callback(this.state);
    this.innerHTML = this.render()
      .toString()
      .replaceAll(",", "")
      .trim()
      .replaceAll(/true|false/gi, "");
  }

  connectedCallback() {
    this.innerHTML = this.render()
      .toString()
      .replaceAll(",", "")
      .trim()
      .replaceAll(/true|false/gi, "");
    this.componentDidMount();
    this.registerEvents();
  }

  disconnectedCallback() {
    this.componentWillUnmount();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.componentWillUpdate(name, oldValue, newValue);
    this.getAttributeNames().forEach((name) => {
      this.props[name] = this.getAttribute(name);
    });
  }

  dispatch(type, props) {
    this.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: props }));
  }

  registerEvents() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentWillUpdate() {}
  componentWillUnmount() {}
  render() {}
}
