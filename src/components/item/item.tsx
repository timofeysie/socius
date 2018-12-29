import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'folia-item',
  styleUrl: 'item.scss',
  shadow: true
})
export class Item {
  @Prop() label: string;
 
  @Prop() description: string;
 
  render() {
    return (
      <div>
        {this.label}
      </div>
    );
  }
}
