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
export class Button {
    constructor() {
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
    }
    handleClick() {
        if (this.el) {
            let button = this.element.shadowRoot.querySelector('button');
            button.style.minWidth = '10px';
            button.style.borderRadius = '50px';
            button.className = 'spinner';
            this.element.innerHTML = '';
        }
    }
    /**
     * Component lifecycle events
     * Ordered by their natural call order.
     */
    componentWillLoad() {
        //console.log('componentWillLoad');
    }
    componentDidLoad() {
        this.el = this.element;
        //const style = this.element.style;
        //console.log('componentDidLoad',style);
    }
    componentWillEnter() {
        //console.log('componentWillEnter');
    }
    componentDidEnter() {
        //console.log('componentDidEnter');
    }
    componentWillLeave() {
        //console.log('componentWillLeave');
    }
    componentDidLeave() {
        //console.log('componentDidLeave');
    }
    componentDidUnload() {
        //console.log('componentDidUnload');
    }
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
    static get style() { return "/**style-placeholder:folia-button:**/"; }
}
