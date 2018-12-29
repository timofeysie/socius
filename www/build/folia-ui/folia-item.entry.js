/*! Built with http://stenciljs.com */
const { h } = window.FoliaUi;

class Item {
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
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\nbutton {\n  min-height: 4vw;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #68c3c0;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #33807d; }\n  button:active {\n    background-color: #2c6e6b; }\n  button:disabled {\n    opacity: 0.4; }\n    button:disabled.accent {\n      background-color: #F25346; }\n      button:disabled.accent:hover {\n        background-color: #c75943; }\n      button:disabled.accent:active {\n        background-color: #a64531; }\n    button:disabled.light {\n      background-color: #D8D0D1;\n      color: rgba(0, 0, 0, 0.7); }\n      button:disabled.light:hover {\n        background-color: #7d686b; }\n      button:disabled.light:active {\n        background-color: #615153; }\n    button:disabled.round {\n      border-radius: 50px; }\n    button:disabled.small {\n      padding: 2px 8px;\n      font-size: 12px; }\n    button:disabled.large {\n      padding: 8px 20px;\n      font-size: 16px; }"; }
}

export { Item as FoliaItem };
