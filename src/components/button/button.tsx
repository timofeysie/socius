import { Component, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/interfaces';

/**
 * Our props color, shape, and size.
 * Instead of defining my types for these props to be of type string, 
 * We're going a step further and defining that each prop can be one of several specific strings. 
 * This allows for much more effective hints and dot complete a.k.a. IntelliSense.
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
  tag: 'curchod-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  @Prop({ reflectToAttr: true })
  @Prop()
  type: 'button' | 'reset' | 'submit' = 'button';
  @Prop()
  color: 'primary' | 'accent' | 'light' = 'primary';
  @Prop()
  shape: 'square' | 'round' = 'square';
  @Prop()
  size: 'small' | 'default' | 'large' = 'default';
  disabled: boolean;
  handleClick() {
    alert('Received the button click!');
  }
  render() {
    const classMap = this.getCssClassMap();
    console.log('classMap',classMap);
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
