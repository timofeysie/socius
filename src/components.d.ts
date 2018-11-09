/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface CurchodButton {
    'color': 'primary' | 'accent' | 'light';
    'shape': 'square' | 'round';
    'size': 'small' | 'default' | 'large';
    'type': 'button' | 'reset' | 'submit';
  }
  interface CurchodButtonAttributes extends StencilHTMLAttributes {
    'color'?: 'primary' | 'accent' | 'light';
    'shape'?: 'square' | 'round';
    'size'?: 'small' | 'default' | 'large';
    'type'?: 'button' | 'reset' | 'submit';
  }

  interface CurchodItem {
    'description': string;
    'label': string;
  }
  interface CurchodItemAttributes extends StencilHTMLAttributes {
    'description'?: string;
    'label'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'CurchodButton': Components.CurchodButton;
    'CurchodItem': Components.CurchodItem;
  }

  interface StencilIntrinsicElements {
    'curchod-button': Components.CurchodButtonAttributes;
    'curchod-item': Components.CurchodItemAttributes;
  }


  interface HTMLCurchodButtonElement extends Components.CurchodButton, HTMLStencilElement {}
  var HTMLCurchodButtonElement: {
    prototype: HTMLCurchodButtonElement;
    new (): HTMLCurchodButtonElement;
  };

  interface HTMLCurchodItemElement extends Components.CurchodItem, HTMLStencilElement {}
  var HTMLCurchodItemElement: {
    prototype: HTMLCurchodItemElement;
    new (): HTMLCurchodItemElement;
  };

  interface HTMLElementTagNameMap {
    'curchod-button': HTMLCurchodButtonElement
    'curchod-item': HTMLCurchodItemElement
  }

  interface ElementTagNameMap {
    'curchod-button': HTMLCurchodButtonElement;
    'curchod-item': HTMLCurchodItemElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
