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
    static get style() { return "/**style-placeholder:folia-button:**/"; }
}
