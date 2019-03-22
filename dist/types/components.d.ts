/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface FoliaButton {
    'color': 'primary' | 'accent' | 'light';
    'shape': 'square' | 'round';
    'size': 'small' | 'default' | 'large';
    /**
    * Internal props (context and connect) Inlined decorator.  Using reflectToAttr makes sure our disabled prop stays in sync with an HTML attribute.
    */
    'type': 'button' | 'reset' | 'success' | 'error' | 'submit';
  }
  interface FoliaButtonAttributes extends StencilHTMLAttributes {
    'color'?: 'primary' | 'accent' | 'light';
    'shape'?: 'square' | 'round';
    'size'?: 'small' | 'default' | 'large';
    /**
    * Internal props (context and connect) Inlined decorator.  Using reflectToAttr makes sure our disabled prop stays in sync with an HTML attribute.
    */
    'type'?: 'button' | 'reset' | 'success' | 'error' | 'submit';
  }

  interface FoliaItem {
    'description': string;
    'label': string;
  }
  interface FoliaItemAttributes extends StencilHTMLAttributes {
    'description'?: string;
    'label'?: string;
  }

  interface FoliaTab {
    'active': boolean;
    'disabled': boolean;
    'label': string;
  }
  interface FoliaTabAttributes extends StencilHTMLAttributes {
    'active'?: boolean;
    'disabled'?: boolean;
    'label'?: string;
  }

  interface FoliaTabs {
    'openTab': (index: number) => void;
  }
  interface FoliaTabsAttributes extends StencilHTMLAttributes {
    'onChange'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'FoliaButton': Components.FoliaButton;
    'FoliaItem': Components.FoliaItem;
    'FoliaTab': Components.FoliaTab;
    'FoliaTabs': Components.FoliaTabs;
  }

  interface StencilIntrinsicElements {
    'folia-button': Components.FoliaButtonAttributes;
    'folia-item': Components.FoliaItemAttributes;
    'folia-tab': Components.FoliaTabAttributes;
    'folia-tabs': Components.FoliaTabsAttributes;
  }


  interface HTMLFoliaButtonElement extends Components.FoliaButton, HTMLStencilElement {}
  var HTMLFoliaButtonElement: {
    prototype: HTMLFoliaButtonElement;
    new (): HTMLFoliaButtonElement;
  };

  interface HTMLFoliaItemElement extends Components.FoliaItem, HTMLStencilElement {}
  var HTMLFoliaItemElement: {
    prototype: HTMLFoliaItemElement;
    new (): HTMLFoliaItemElement;
  };

  interface HTMLFoliaTabElement extends Components.FoliaTab, HTMLStencilElement {}
  var HTMLFoliaTabElement: {
    prototype: HTMLFoliaTabElement;
    new (): HTMLFoliaTabElement;
  };

  interface HTMLFoliaTabsElement extends Components.FoliaTabs, HTMLStencilElement {}
  var HTMLFoliaTabsElement: {
    prototype: HTMLFoliaTabsElement;
    new (): HTMLFoliaTabsElement;
  };

  interface HTMLElementTagNameMap {
    'folia-button': HTMLFoliaButtonElement
    'folia-item': HTMLFoliaItemElement
    'folia-tab': HTMLFoliaTabElement
    'folia-tabs': HTMLFoliaTabsElement
  }

  interface ElementTagNameMap {
    'folia-button': HTMLFoliaButtonElement;
    'folia-item': HTMLFoliaItemElement;
    'folia-tab': HTMLFoliaTabElement;
    'folia-tabs': HTMLFoliaTabsElement;
  }


}
