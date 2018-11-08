import { Component } from '@stencil/core';

@Component({
  tag: 'curchod-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {
  render() {
    return (
      <button>
        <slot>Click Me!</slot>
      </button>
    );
  }
}
