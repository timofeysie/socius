/*! Built with http://stenciljs.com */
const { h } = window.FoliaUi;

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
 */
class Button {
    constructor() {
        this.children = [];
        /**
         * Internal props (context and connect)
         * Inlined decorator.
         *
         * Using reflectToAttr makes sure our disabled prop
         * stays in sync with an HTML attribute.
         */
        this.type = 'button';
        this.color = 'primary';
        this.shape = 'square';
        this.size = 'default';
        // temp
        this.state = 'waiting';
    }
    typeChange(newValue, oldValue) {
        console.log('newValue', newValue);
        console.log('oldValue', oldValue);
        let button = this.element.shadowRoot.querySelector('button');
        if (oldValue === 'submit' && newValue === 'loading') {
            this.startSpinner(button);
        }
        else if (oldValue === 'loading' && newValue === 'submit') {
            this.resetSpinner(button);
        }
    }
    handleClick() {
        let button = this.element.shadowRoot.querySelector('button');
        if (this.state === 'waiting') {
            this.startSpinner(button);
        }
        else if (this.state === 'loading') {
            this.resetSpinner(button);
        }
    }
    // These actions seem all really redundant now, but each one will
    // go it's own way.  Some code in common can then be re-factored out
    startSpinner(button) {
        if (this.shape === 'round' || this.shape !== 'square') {
            this.startRoundSpinner(button);
        }
        else if (this.shape === 'square' || this.shape !== 'round') {
            this.startSquareSpinner(button);
        }
    }
    resetSpinner(button) {
        if (this.shape === 'round' || this.shape !== 'square') {
            this.resetRoundSpinner(button);
        }
        else if (this.shape === 'square' || this.shape !== 'round') {
            this.resetSquareSpinner(button);
        }
    }
    startSquareSpinner(button) {
        this.saveState(button);
        this.state = 'loading';
        this.text = this.element.innerHTML;
        this.stateProperties = button.className;
        button.className = button.className + ' square_spinner loading';
        console.log('utton.className', button.className);
        this.element.innerHTML = '&nbsp;';
    }
    startRoundSpinner(button) {
        this.saveState(button);
        this.state = 'loading';
        this.text = this.element.innerHTML;
        this.stateProperties = button.className;
        button.className = button.className + ' spinner loading loading_' + this.size;
        this.element.innerHTML = '&nbsp;';
    }
    resetSquareSpinner(button) {
        this.state = 'waiting';
        button.className = this.removeClass(button.className, 'square_spinner');
        button.className = this.removeClass(button.className, 'loading');
        button.style.height = this.stateProperties.height;
        // This is one way to stop the button jumping back to it's original sizes
        // instead of using the transition.
        setTimeout(() => {
            this.element.innerHTML = this.text;
        }, 1000);
    }
    resetRoundSpinner(button) {
        this.state = 'waiting';
        button.className = this.removeClass(button.className, 'spinner');
        button.className = this.removeClass(button.className, 'loading');
        button.className = this.removeClass(button.className, 'loading_' + this.size);
        button.style.height = this.stateProperties.height;
        // This is one way to stop the button jumping back to it's original sizes
        // instead of using the transition.
        setTimeout(() => {
            this.element.innerHTML = this.text;
        }, 1000);
    }
    removeClass(classNames, classToRemove) {
        let parts = classNames.split(' ');
        let index = parts.indexOf(classToRemove);
        if (index > -1) {
            parts.splice(index, 1);
        }
        return parts.join(' ');
    }
    saveState(button) {
        this.text = this.element.innerHTML;
        this.stateProperties = {
            minWidth: button.style.minWidth,
            height: button.style.height,
            className: button.className,
        };
    }
    /**
     * Component lifecycle events
     * Ordered by their natural call order.
     */
    componentWillLoad() {
        // let slotted = this.element.shadowRoot.querySelector('slot') as HTMLSlotElement;
        // this.children = slotted.assignedNodes().filter((node) => { return node.nodeName !== '#text'; });
    }
    componentDidLoad() { }
    componentWillEnter() { }
    componentDidEnter() { }
    componentWillLeave() { }
    componentDidLeave() { }
    componentDidUnload() { }
    /**
     * render() functionq
     * Always the last one in the class.
     */
    render() {
        const classMap = this.getCssClassMap();
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
    static get is() { return "folia-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "children": {
            "state": true
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "element": {
            "elementRef": true
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
            "reflectToAttr": true,
            "watchCallbacks": ["typeChange"]
        }
    }; }
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\n/** Spinner */\n\@-webkit-keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\@keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n.spinner:before {\n  content: '';\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  border-radius: 50%;\n  border: 2px solid #68c3c0;\n  border-top-color: #333;\n  -webkit-animation: spinner .6s linear infinite;\n  animation: spinner .6s linear infinite; }\n\n/** spinner types */\n.loading_small:before {\n  width: 18px;\n  height: 18px;\n  margin-top: 1px;\n  margin-left: -7px; }\n\n.loading_large:before {\n  width: 32px;\n  height: 32px;\n  margin-top: -6px;\n  margin-left: -18px; }\n\n.loading_default:before {\n  width: 18px;\n  height: 18px;\n  margin-top: 1px;\n  margin-left: -7px; }\n\n/** type: square */\n.square_spinner {\n  display: inline-block;\n  background-color: #0074d9;\n  font-size: 1px;\n  padding: 1px;\n  color: white;\n  -webkit-animation: roll 3s infinite;\n  animation: roll 3s infinite;\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n  opacity: .7; }\n\n\@-webkit-keyframes roll {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n\@keyframes roll {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n/** Buttons */\nbutton:focus {\n  outline: 0; }\n\nbutton {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-transition: min-width 1s;\n  transition: min-width 1s;\n  min-height: 3.5vw;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #68c3c0;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #33807d; }\n  button:active {\n    background-color: #2c6e6b; }\n  button:disabled {\n    opacity: 0.4; }\n  button.accent {\n    background-color: #F25346; }\n    button.accent:hover {\n      background-color: #c75943; }\n    button.accent:active {\n      background-color: #a64531; }\n  button.light {\n    background-color: #D8D0D1;\n    color: rgba(0, 0, 0, 0.7); }\n    button.light:hover {\n      background-color: #7d686b; }\n    button.light:active {\n      background-color: #615153; }\n  button.round {\n    border-radius: 50px; }\n  button.small {\n    padding: 2px 8px;\n    font-size: 12px; }\n  button.large {\n    padding: 8px 20px;\n    font-size: 16px; }\n  button.loading {\n    min-width: .5vw; }"; }
}

export { Button as FoliaButton };
