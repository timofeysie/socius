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
    handleClick() {
        let button = this.element.shadowRoot.querySelector('button');
        if (this.state === 'waiting') {
            this.saveState(button);
            this.state = 'loading';
            this.text = this.element.innerHTML;
            this.stateProperties = button.className;
            button.className = button.className + ' spinner loading';
            this.element.innerHTML = ' ';
        }
        else if (this.state === 'loading') {
            this.state = 'waiting';
            button.className = this.removeClass(button.className, 'spinner');
            button.className = this.removeClass(button.className, 'loading');
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
            borderRadius: button.style.borderRadius,
            className: button.className,
        };
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
    static get style() { return "/**style-placeholder:folia-button:**/"; }
}
