import { Component, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/interfaces';

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
  render() {
    const classMap = this.getCssClassMap();

    return (
      <button type={this.type} class={classMap} disabled={this.disabled}>
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
