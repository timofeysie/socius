/*! Built with http://stenciljs.com */
const { h } = window.CurchodUi;

/**
 * Our props color, shape, and size.
 * Instead of defining my types for these props to be of type string,
 * We're going a step further and defining that each prop can be one of several specific strings.
 * This allows for much more effective hints and dot complete (a.k.a. intellisense).
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
        /**
         * Internal props (context and connect)
         * Inlined decorator.
         */
        this.type = 'button';
        this.color = 'primary';
        this.shape = 'square';
        this.size = 'default';
    }
    handleClick() {
        console.log('Received the button click!');
    }
    /**
     * Component lifecycle events
     * Ordered by their natural call order.
     */
    componentWillLoad() {
        console.log('componentWillLoad');
    }
    componentDidLoad() {
        console.log('componentDidLoad');
    }
    componentWillEnter() {
        console.log('componentWillEnter');
    }
    componentDidEnter() {
        console.log('componentDidEnter');
    }
    componentWillLeave() {
        console.log('componentWillLeave');
    }
    componentDidLeave() {
        console.log('componentDidLeave');
    }
    componentDidUnload() {
        console.log('componentDidUnload');
    }
    /**
     * render() functionq
     * Always the last one in the class.
     */
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
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\nbutton:focus {\n  outline: 0; }\n\nbutton {\n  min-height: 4vw;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #68c3c0;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #33807d; }\n  button:active {\n    background-color: #2c6e6b; }\n  button:disabled {\n    opacity: 0.4; }\n  button.accent {\n    background-color: #F25346; }\n    button.accent:hover {\n      background-color: #c75943; }\n    button.accent:active {\n      background-color: #a64531; }\n  button.light {\n    background-color: #D8D0D1;\n    color: rgba(0, 0, 0, 0.7); }\n    button.light:hover {\n      background-color: #7d686b; }\n    button.light:active {\n      background-color: #615153; }\n  button.round {\n    border-radius: 50px; }\n  button.small {\n    padding: 2px 8px;\n    font-size: 12px; }\n  button.large {\n    padding: 8px 20px;\n    font-size: 16px; }"; }
}

export { Button as CurchodButton };
