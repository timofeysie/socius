import { Component, Prop, Element, State } from '@stencil/core';
import { CssClassMap } from '../../utils/interfaces';

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
@Component({
  tag: 'folia-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  @Element() element: HTMLElement;
  @State() children: Array<any> = [];
  /**
   * Internal props (context and connect)
   * Inlined decorator.
   *
   * Using reflectToAttr makes sure our disabled prop
   * stays in sync with an HTML attribute.
   */
  @Prop({ reflectToAttr: true })
  /**
   * Public Property API
   */
  @Prop() type: 'button' | 'reset' | 'success' | 'error' | 'submit' = 'button';
  @Prop() color: 'primary' | 'accent' | 'light' = 'primary';
  @Prop() shape: 'square' | 'round' = 'square';
  @Prop() size: 'small' | 'default' | 'large' = 'default';
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
  // temp
  state: string = 'waiting';
  text: string;
  stateProperties;

  handleClick() {
    let button = this.element.shadowRoot.querySelector('button');
    if (this.state === 'waiting') {
      this.startSpinner(button);
    } else if (this.state === 'loading') {
      this.resetSpinner(button);
    }
  }

  // These actions seem all really redundant now, but each one will
  // go it's own way.  Some code in common can then be re-factored out

  startSpinner(button) {
    if (this.shape === 'round' || this.shape !== 'square') {
      this.startRoundSpinner(button);
    } else if (this.shape === 'square' || this.shape !== 'round') {
      this.startSquareSpinner(button);
    }
  }

  resetSpinner(button) {
    if (this.shape === 'round' || this.shape !== 'square') {
      this.resetRoundSpinner(button);
    } else if (this.shape === 'square' || this.shape !== 'round') {
      this.resetSquareSpinner(button);
    }
  }

  startSquareSpinner(button) {
    this.saveState(button);
    this.state = 'loading';
    this.text = this.element.innerHTML;
    this.stateProperties = button.className;
    button.className = button.className+' square_spinner loading';
    console.log('utton.className',button.className);
    this.element.innerHTML = '&nbsp;';
  }

  startRoundSpinner(button) {
    this.saveState(button);
    this.state = 'loading';
    this.text = this.element.innerHTML;
    this.stateProperties = button.className;
    button.className = button.className+' spinner loading loading_'+this.size;
    this.element.innerHTML = '&nbsp;';
  }

  resetSquareSpinner(button) {
    this.state = 'waiting';
    button.className = this.removeClass(button.className, 'square_spinner');
    button.className = this.removeClass(button.className, 'loading');
    button.style.height  = this.stateProperties.height;
    // This is one way to stop the button jumping back to it's original sizes
    // instead of using the transition.
    setTimeout(() => {
      this.element.innerHTML = this.text;
    },1000);
  }

  resetRoundSpinner(button) {
    this.state = 'waiting';
    button.className = this.removeClass(button.className, 'spinner');
    button.className = this.removeClass(button.className, 'loading');
    button.className = this.removeClass(button.className, 'loading_'+this.size);
    button.style.height  = this.stateProperties.height;
    // This is one way to stop the button jumping back to it's original sizes
    // instead of using the transition.
    setTimeout(() => {
      this.element.innerHTML = this.text;
    },1000);
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
    }
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
    return (
      <button type={this.type}
        class={classMap}
        disabled={this.disabled}
        onClick={ () => this.handleClick()}>
        <slot />
      </button>
    );
  }

  private getCssClassMap(): CssClassMap {
    return {
      [this.color]: true,
      [this.shape]: true,
      [this.size]: true
    };
  }
}
