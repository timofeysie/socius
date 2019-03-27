import { Component, Prop, Element, State, Watch } from '@stencil/core';
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
  @Prop() type: 'button' | 'reset' | 'success' | 'error' | 'submit' | 'loading' = 'button';
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

  /** State transitions depend on the previous state.
  * If the buttin type is submit, then changing the type to loading will trigger the
  * shape specific animation.   Then changing the type to either success or error
  * will trigger those animations.
  */
  @Watch('type')
  typeChange(newValue: string, oldValue: string) {
    let button = this.element.shadowRoot.querySelector('button');
    if (oldValue === 'submit' && newValue === 'loading') {
      this.startSpinner(button);
    } else if (oldValue === 'loading' && newValue === 'submit') {
      this.resetSpinner(button);
    } else if (oldValue === 'loading' && newValue === 'success') {
      this.showSuccessCheckmark(button);
    } else if (oldValue === 'loading' && newValue === 'error') {
      this.showError(button);
    } else if (newValue === 'button' || newValue === 'reset') {
      this.resetToButton(button);
    }
  }

  /** Debug method.  Should not be deployed */
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

  /** Check the shape and call the appropriate function. */
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

  showSuccessCheckmark(button) {
    if (this.shape === 'round' || this.shape !== 'square') {
      this.showRoundSuccessCheckmark(button);
    } else if (this.shape === 'square' || this.shape !== 'round') {
      this.showSquareSuccessCheckmark(button);
    }
  }

  showError(button) {
    if (this.shape === 'round' || this.shape !== 'square') {
      this.showRoundError(button);
    } else if (this.shape === 'square' || this.shape !== 'round') {
      this.showSquareError(button);
    }
  }

  startSquareSpinner(button) {
    this.saveState(button);
    this.state = 'loading';
    this.text = this.element.innerHTML;
    this.stateProperties = button.className;
    button.className = button.className+' square_spinner loading';
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
    // This stops the button jumping back to it's original sizes
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
    setTimeout(() => {
      this.element.innerHTML = this.text;
    },1000);
  }

  showRoundSuccessCheckmark(button) {
    button.className = this.removeClass(button.className, 'spinner');
    button.className = this.removeClass(button.className, this.shape+'_spinner');
    button.className = this.removeClass(button.className, 'loading_'+this.size);
    button.className = button.className + ' draw checkmark checkmark_'+this.size;
  }

  showSquareSuccessCheckmark(button) {
    button.className = this.removeClass(button.className, 'spinner');
    button.className = this.removeClass(button.className, this.shape+'_spinner');
    button.className = this.removeClass(button.className, 'loading_'+this.size);
    button.className = button.className + ' draw checkmark checkmark_'+this.size;
  }

  showRoundError(button) {
    button.className = this.removeClass(button.className, 'spinner');
    button.className = this.removeClass(button.className, this.shape+'_spinner');
    button.className = this.removeClass(button.className, 'loading_'+this.size);
    button.className = button.className + ' error-circle';
  }

  showSquareError(button) {
    button.className = this.removeClass(button.className, 'spinner');
    button.className = this.removeClass(button.className, this.shape+'_spinner');
    button.className = this.removeClass(button.className, 'loading_'+this.size);
    button.className = button.className + ' error-circle';
  }

  /**  If the height was changed previously, reset that first.
  * Next set the ubbton classes to all the property values.
  * Finally, return the text content.
  */
  resetToButton(button) {
    if (this.stateProperties.height) {
      button.style.height  = this.stateProperties.height;
    }
    button.className = this.type+' '+this.color+' '+this.shape+' '+this.size;
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
