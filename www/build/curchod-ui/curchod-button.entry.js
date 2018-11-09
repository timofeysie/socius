/*! Built with http://stenciljs.com */
const { h } = window.CurchodUi;

/**
 * Our props color, shape, and size.
 * Instead of defining my types for these props to be of type string,
 * We're going a step further and defining that each prop can be one of several specific strings.
 * This allows for much more effective hints and dot complete a.k.a. IntelliSense.
 * There are a few specific sizes, colors, shapes, and types that are implemented.
 * On top of that, we initialize those props to some preferred defaults,
 * so that if you simply create a button component with no defined props,
 * it'll look like a default button.
 *
 * We use those props to build a map of CSS classes to apply to our components.
 * The CssClassMap defines an interface for this purpose.
 * The class map type is a map of a key, the class name, and the value being a boolean.
 * This specifies whether we want the classes to be applied or not.
 *
 */
class Button {
    constructor() {
        this.type = 'button';
        this.color = 'primary';
        this.shape = 'square';
        this.size = 'default';
    }
    handleClick() {
        alert('Received the button click!');
    }
    render() {
        const classMap = this.getCssClassMap();
        console.log('classMap', classMap);
        return (h("button", { type: this.type, class: classMap, disabled: this.disabled, onClick: () => this.handleClick() },
            h("slot", null)));
    }
    getCssClassMap() {
        return {
            [this.color]: true,
            [this.shape]: true,
            [this.size]: true
        };
    }
    static get is() { return "curchod-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "shape": {
            "type": String,
            "attr": "shape"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "type": {
            "type": String,
            "attr": "type",
            "reflectToAttr": true
        }
    }; }
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\nbutton {\n  min-height: 4vw;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #4571c4;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #315db0; }\n  button:active {\n    background-color: #2b529c; }\n  button:disabled {\n    opacity: 0.4; }\n    button:disabled.accent {\n      background-color: #c75943; }\n      button:disabled.accent:hover {\n        background-color: #a83a24; }\n      button:disabled.accent:active {\n        background-color: #7e2c1b; }\n    button:disabled.light {\n      background-color: #f0f1f2;\n      color: rgba(0, 0, 0, 0.7); }\n      button:disabled.light:hover {\n        background-color: #e2e3e4; }\n      button:disabled.light:active {\n        background-color: #c8cacb; }\n    button:disabled.round {\n      border-radius: 50px; }\n    button:disabled.small {\n      padding: 2px 8px;\n      font-size: 12px; }\n    button:disabled.large {\n      padding: 8px 20px;\n      font-size: 16px; }"; }
}

export { Button as CurchodButton };
