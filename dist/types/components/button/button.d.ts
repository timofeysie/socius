import '../../stencil.core';
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
export declare class Button {
    element: HTMLElement;
    children: Array<any>;
    /**
     * Internal props (context and connect)
     * Inlined decorator.
     *
     * Using reflectToAttr makes sure our disabled prop
     * stays in sync with an HTML attribute.
     */
    type: 'button' | 'reset' | 'success' | 'error' | 'submit' | 'loading';
    color: 'primary' | 'accent' | 'light';
    shape: 'square' | 'round';
    size: 'small' | 'default' | 'large';
    /**
     * Own Properties
     * Always set the type if a default value has not
     * been set. If a default value is being set, then type
     * is already inferred. List the own properties in
     * alphabetical order. Note that because these properties
     * do not have the @Prop() decorator, they will not be exposed
     * publicly on the host element, but only used internally.
     */
    disabled: boolean;
    state: string;
    text: string;
    stateProperties: any;
    /** State transitions depend on the previous state.
    * If the buttin type is submit, then changing the type to loading will trigger the
    * shape specific animation.   Then changing the type to either success or error
    * will trigger those animations.
    */
    typeChange(newValue: string, oldValue: string): void;
    startShapeSpinner(button: any): void;
    resetShapeSpinner(button: any): void;
    showSucceessOrError(button: any): void;
    /**  If the height was changed previously, reset that first.
    * Next set the ubbton classes to all the property values.
    * Finally, return the text content.
    */
    resetToButton(button: any): void;
    /** Find the class to remove in the class names and return the string without it. */
    removeClass(classNames: any, classToRemove: any): any;
    saveState(button: any): void;
    /**
     * Component lifecycle events
     * Ordered by their natural call order.
     */
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillEnter(): void;
    componentDidEnter(): void;
    componentWillLeave(): void;
    componentDidLeave(): void;
    componentDidUnload(): void;
    /**
     * render() functionq
     * Always the last one in the class.
     */
    render(): JSX.Element;
    private getCssClassMap;
}
