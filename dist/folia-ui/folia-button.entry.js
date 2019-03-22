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
    handleClick() {
        let button = this.element.shadowRoot.querySelector('button');
        if (this.state === 'waiting') {
            this.saveState(button);
            this.state = 'loading';
            this.text = this.element.innerHTML;
            this.stateProperties = button.className;
            button.className = button.className + ' spinner loading';
            this.element.innerHTML = '&nbsp;';
        }
        else if (this.state === 'loading') {
            this.state = 'waiting';
            button.className = this.removeClass(button.className, 'spinner');
            button.className = this.removeClass(button.className, 'loading');
            button.style.height = this.stateProperties.height;
            // This is one way to stop the button jumping back to it's original sizes
            // instead of using the transition.
            setTimeout(() => {
                this.element.innerHTML = this.text;
            }, 1000);
        }
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
        console.log('this.stateProperties', this.stateProperties);
    }
    /**
     * Component lifecycle events
     * Ordered by their natural call order.
     */
    componentWillLoad() {
        let slotted = this.element.shadowRoot.querySelector('slot');
        this.children = slotted.assignedNodes().filter((node) => { return node.nodeName !== '#text'; });
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
            "reflectToAttr": true
        }
    }; }
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\n\@-webkit-keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n\@keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n.spinner:before {\n  content: '';\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  border-radius: 50%;\n  border: 2px solid #68c3c0;\n  border-top-color: #333;\n  -webkit-animation: spinner .6s linear infinite;\n  animation: spinner .6s linear infinite; }\n\nbutton:focus {\n  outline: 0; }\n\nbutton {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-transition: min-width 1s;\n  transition: min-width 1s;\n  min-height: 3.5vw;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #68c3c0;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #33807d; }\n  button:active {\n    background-color: #2c6e6b; }\n  button:disabled {\n    opacity: 0.4; }\n  button.accent {\n    background-color: #F25346; }\n    button.accent:hover {\n      background-color: #c75943; }\n    button.accent:active {\n      background-color: #a64531; }\n  button.light {\n    background-color: #D8D0D1;\n    color: rgba(0, 0, 0, 0.7); }\n    button.light:hover {\n      background-color: #7d686b; }\n    button.light:active {\n      background-color: #615153; }\n  button.round {\n    border-radius: 50px; }\n  button.small {\n    padding: 2px 8px;\n    font-size: 12px; }\n  button.large {\n    padding: 8px 20px;\n    font-size: 16px; }\n  button.loading {\n    min-width: .5vw; }"; }
}

export { Button as FoliaButton };
