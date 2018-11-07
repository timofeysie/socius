export class MyComponent {
    format() {
        return ((this.first || '') +
            (this.middle ? ` ${this.middle}` : '') +
            (this.last ? ` ${this.last}` : ''));
    }
    render() {
        return h("div", null,
            "Hello, World! I'm ",
            this.format());
    }
    static get is() { return "my-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "first": {
            "type": String,
            "attr": "first"
        },
        "last": {
            "type": String,
            "attr": "last"
        },
        "middle": {
            "type": String,
            "attr": "middle"
        }
    }; }
    static get style() { return "/**style-placeholder:my-component:**/"; }
}
