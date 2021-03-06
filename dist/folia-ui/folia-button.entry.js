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
    static get style() { return "/**\n * \@prop --background: Background of the button\n * \@prop --background-activated: Background of the button when activated\n * \@prop --background-focused: Background of the button when focused\n */\n:host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\n/* Spinner */\n\@-webkit-keyframes spinner {\n  to {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg); } }\n\@keyframes spinner {\n  to {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg); } }\n\n.spinner::before {\n  content: '';\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: absolute;\n  border-radius: 50%;\n  border: 2px solid #68c3c0;\n  border-top-color: #333;\n  -webkit-animation: spinner .6s linear infinite;\n  animation: spinner .6s linear infinite; }\n\n/* spinner types */\n.loading_small::before {\n  width: 18px;\n  height: 18px;\n  margin-top: 1px;\n  margin-left: -7px; }\n\n.loading_large {\n  width: 19px; }\n\n.loading_large::before {\n  width: 32px;\n  height: 32px;\n  margin-top: -6px;\n  margin-left: -17px; }\n\n.loading_default::before {\n  width: 18px;\n  height: 18px;\n  margin-top: 1px;\n  margin-left: -7px; }\n\n/* type: square */\n.square_spinner {\n  display: inline-block;\n  background-color: #0074d9;\n  font-size: 1px;\n  padding: 1px;\n  color: white;\n  -webkit-animation: roll 3s infinite;\n  animation: roll 3s infinite;\n  transform: rotate(30deg);\n  -webkit-transform: rotate(30deg);\n  opacity: .7; }\n\n\@-webkit-keyframes roll {\n  0% {\n    transform: rotate(0);\n    -webkit-transform: rotate(0); }\n  100% {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg); } }\n\n\@keyframes roll {\n  0% {\n    transform: rotate(0);\n    -webkit-transform: rotate(0); }\n  100% {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg); } }\n\n/* Buttons */\nbutton:focus {\n  outline: 0; }\n\nbutton {\n  position: relative;\n  -webkit-transition: min-width 1s;\n  transition: min-width 1s;\n  min-height: 27px;\n  max-height: 27px;\n  min-width: 20%;\n  font-family: \"Open Sans\", \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n  cursor: pointer;\n  border: none;\n  background-color: #68c3c0;\n  color: #ffffff;\n  line-height: 20px;\n  font-size: 14px;\n  padding: 4px 12px;\n  border-radius: 3px; }\n  button:hover {\n    background-color: #33807d; }\n  button:active {\n    background-color: #2c6e6b; }\n  button:disabled {\n    opacity: 0.4; }\n  button.accent {\n    background-color: #F25346; }\n    button.accent:hover {\n      background-color: #c75943; }\n    button.accent:active {\n      background-color: #a64531; }\n  button.light {\n    background-color: #D8D0D1;\n    color: rgba(0, 0, 0, 0.7); }\n    button.light:hover {\n      background-color: #7d686b; }\n    button.light:active {\n      background-color: #615153; }\n  button.round {\n    border-radius: 50px; }\n  button.small {\n    padding: 2px 8px;\n    font-size: 12px;\n    width: 27px; }\n  button.large {\n    padding: 8px 20px;\n    font-size: 16px; }\n  button.loading {\n    min-width: .5vw; }\n\n/* Success checkmark ----------------------------- */\n\@-webkit-keyframes checkmark_small_animation {\n  0% {\n    height: 0;\n    width: 0;\n    opacity: 1; }\n  20% {\n    height: 0;\n    width: 0.56548em;\n    opacity: 1; }\n  40% {\n    height: 1.35714em;\n    width: 0.56548em;\n    opacity: 1; }\n  100% {\n    height: 1.35714em;\n    width: 0.56548em;\n    opacity: 1; } }\n\@keyframes checkmark_small_animation {\n  0% {\n    height: 0;\n    width: 0;\n    opacity: 1; }\n  20% {\n    height: 0;\n    width: 0.56548em;\n    opacity: 1; }\n  40% {\n    height: 1.35714em;\n    width: 0.56548em;\n    opacity: 1; }\n  100% {\n    height: 1.35714em;\n    width: 0.56548em;\n    opacity: 1; } }\n\n\@-webkit-keyframes checkmark_large_animation {\n  0% {\n    height: 0;\n    width: 0;\n    opacity: 1; }\n  20% {\n    height: 0;\n    width: 0.58em;\n    opacity: 1; }\n  40% {\n    height: 1.7em;\n    width: 0.88em;\n    opacity: 1; }\n  100% {\n    height: 1.7em;\n    width: 0.88em;\n    opacity: 1; } }\n\n\@keyframes checkmark_large_animation {\n  0% {\n    height: 0;\n    width: 0;\n    opacity: 1; }\n  20% {\n    height: 0;\n    width: 0.58em;\n    opacity: 1; }\n  40% {\n    height: 1.7em;\n    width: 0.88em;\n    opacity: 1; }\n  100% {\n    height: 1.7em;\n    width: 0.88em;\n    opacity: 1; } }\n\n.checkmark.draw::after {\n  -webkit-animation-duration: 800ms;\n  animation-duration: 800ms;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  -webkit-animation-name: checkmark;\n  animation-name: checkmark;\n  transform: scaleX(-1) rotate(135deg);\n  -webkit-transform: scaleX(-1) rotate(135deg); }\n\n.checkmark::after {\n  opacity: 1;\n  transform-origin: left top;\n  -webkit-transform-origin: left top;\n  border-right: 3px solid #5cb85c;\n  border-top: 3px solid #5cb85c;\n  content: '';\n  position: absolute; }\n\n.checkmark_small.draw::after, .checkmark_default.draw::after {\n  -webkit-animation-name: checkmark_small_animation;\n  animation-name: checkmark_small_animation; }\n\n.checkmark_small::after, .checkmark_default::after {\n  height: 1.35714em;\n  width: 0.56548em;\n  left: 3px;\n  top: 13.5px; }\n\n.checkmark_large.draw::after {\n  -webkit-animation-name: checkmark_large_animation;\n  animation-name: checkmark_large_animation; }\n\n.checkmark_large::after {\n  height: 1.7em;\n  width: 0.88em;\n  left: 4px;\n  top: 17px; }\n\n/* Error  -------------------------------------- */\n.error_circle {\n  position: relative;\n  background: #990000; }\n\n.error_circle::before {\n  position: absolute;\n  content: '';\n  width: 10%;\n  left: 45%;\n  top: 10%;\n  height: 80%;\n  background-color: white;\n  transform: rotate(45deg);\n  -webkit-transform: rotate(45deg);\n  -webkit-animation-duration: 1800ms;\n  animation-duration: 1800ms;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  -webkit-animation-name: error_before_animation;\n  animation-name: error_before_animation; }\n\n.error_circle::after {\n  position: absolute;\n  content: '';\n  width: 10%;\n  left: 45%;\n  top: 10%;\n  height: 80%;\n  background-color: white;\n  transform: rotate(-45deg);\n  -webkit-transform: rotate(-45deg);\n  -webkit-animation-duration: 800ms;\n  animation-duration: 800ms;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  -webkit-animation-name: error_after_animation;\n  animation-name: error_after_animation; }\n\n\@-webkit-keyframes error_before_animation {\n  0% {\n    height: 0;\n    width: 0;\n    left: 0;\n    top: 0;\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    height: 80%;\n    width: 10%;\n    left: 45%;\n    top: 10%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg); } }\n\n\@keyframes error_before_animation {\n  0% {\n    height: 0;\n    width: 0;\n    left: 0;\n    top: 0;\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    height: 80%;\n    width: 10%;\n    left: 45%;\n    top: 10%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg); } }\n\n\@-webkit-keyframes error_after_animation {\n  0% {\n    height: 0;\n    width: 0;\n    left: 0;\n    top: 0;\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    height: 80%;\n    width: 10%;\n    left: 45%;\n    top: 10%;\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg); } }\n\n\@keyframes error_after_animation {\n  0% {\n    height: 0;\n    width: 0;\n    left: 0;\n    top: 0;\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    height: 80%;\n    width: 10%;\n    left: 45%;\n    top: 10%;\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg); } }"; }
}

export { Button as FoliaButton };
