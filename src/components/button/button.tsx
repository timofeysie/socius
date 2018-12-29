import { Component, Prop } from '@stencil/core';
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
 * 
 */
@Component({
  tag: 'folia-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
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
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';
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
  handleClick() {
    console.log('Received the button click.');
  }
  /**
   * Component lifecycle events
   * Ordered by their natural call order.
   */
  componentWillLoad() {
    //console.log('componentWillLoad');
  }
  componentDidLoad() {
    //console.log('componentDidLoad');
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
