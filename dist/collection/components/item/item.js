export class Item {
    render() {
        return (h("div", null, this.label));
    }
    static get is() { return "folia-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "description": {
            "type": String,
            "attr": "description"
        },
        "label": {
            "type": String,
            "attr": "label"
        }
    }; }
    static get style() { return "/**style-placeholder:folia-item:**/"; }
}
