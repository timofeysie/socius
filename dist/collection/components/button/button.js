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
    /** State transitions depend on the previous state.
    * If the buttin type is submit, then changing the type to loading will trigger the
    * shape specific animation.   Then changing the type to either success or error
    * will trigger those animations.
    */
    typeChange(newValue, oldValue) {
        let button = this.element.shadowRoot.querySelector('button');
        if (oldValue === 'submit' && newValue === 'loading') {
            this.startShapeSpinner(button);
        }
        else if (oldValue === 'loading' && newValue === 'submit') {
            this.resetShapeSpinner(button);
        }
        else if (oldValue === 'loading' && newValue === 'success') {
            this.showSucceessOrError(button);
            button.className = button.className + ' draw checkmark checkmark_' + this.size;
        }
        else if (oldValue === 'loading' && newValue === 'error') {
            this.showSucceessOrError(button);
            button.className = button.className + ' error_circle';
        }
        else if (newValue === 'button' || newValue === 'reset') {
            this.resetToButton(button);
        }
    }
    startShapeSpinner(button) {
        this.saveState(button);
        this.state = 'loading';
        this.text = this.element.innerHTML;
        this.stateProperties = button.className;
        if (this.shape === 'round' || this.shape !== 'square') {
            button.className = button.className + ' spinner loading loading_' + this.size;
        }
        else {
            button.className = button.className + ' square_spinner loading';
        }
        this.element.innerHTML = '&nbsp;';
    }
    resetShapeSpinner(button) {
        this.state = 'waiting';
        if (this.shape === 'round' || this.shape !== 'square') {
            button.className = this.removeClass(button.className, 'spinner');
        }
        else if (this.shape === 'square' || this.shape !== 'round') {
            button.className = this.removeClass(button.className, 'square_spinner');
        }
        button.className = this.removeClass(button.className, 'loading');
        button.className = this.removeClass(button.className, 'loading_' + this.size);
        button.style.height = this.stateProperties.height;
        setTimeout(() => {
            this.element.innerHTML = this.text;
        }, 1000);
    }
    showSucceessOrError(button) {
        button.className = this.removeClass(button.className, 'spinner');
        button.className = this.removeClass(button.className, this.shape + '_spinner');
        button.className = this.removeClass(button.className, 'loading_' + this.size);
    }
    /**  If the height was changed previously, reset that first.
    * Next set the ubbton classes to all the property values.
    * Finally, return the text content.
    */
    resetToButton(button) {
        if (this.stateProperties.height) {
            button.style.height = this.stateProperties.height;
        }
        button.className = this.type + ' ' + this.color + ' ' + this.shape + ' ' + this.size;
        this.element.innerHTML = this.text;
    }
    /** Find the class to remove in the class names and return the string without it. */
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
        return (h("button", { type: this.type, class: classMap, disabled: this.disabled },
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
