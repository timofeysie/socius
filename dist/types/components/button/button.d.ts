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
    typeChange(newValue: string, oldValue: string): void;
    handleClick(): void;
    startSpinner(button: any): void;
    resetSpinner(button: any): void;
    startSquareSpinner(button: any): void;
    startRoundSpinner(button: any): void;
    resetSquareSpinner(button: any): void;
    resetRoundSpinner(button: any): void;
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
