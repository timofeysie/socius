import { Component, State, Element, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/interfaces';

@Component({
    tag: 'folia-tabs',
    shadow: true
})
export class Tabs {

    @Element() el: HTMLElement;
	@State() tabs: HTMLFoliaTabElement[] = [];

    componentWillLoad() {
      // Grab tabs from this component
	  this.tabs = Array.from(this.el.querySelectorAll('folia-tab'));
      if (this.tabs.length === 0) {
        throw new Error('[folia-tabs] Must have at least one tab');
      }
    }

  	@Method()
  	openTab(index: number) {
    	if (index >= this.tabs.length) {
      	throw new Error(
        	`[folia-tabs] Index ${index} is out of bounds of tabs length`
      	);
    	}
    if (!this.tabs[index].disabled) {
      this.tabs = this.tabs.map((tab, i) => {
        tab.active = i === index;
        return tab;
      });
    }
  }

    render() {
      const classMap = this.getCssClassMap();
  
      return (
        <div class={classMap}>
          {this.tabs.map((tab: HTMLFoliaTabElement, index: number) => {
            const tabClassMap: CssClassMap = {
              'tab-button': true,
              active: tab.active
            };
            console.log('index',index, tab);
            return (
              <button
                role="tab"
                disabled={tab.disabled}
                class={tabClassMap}
                onClick={() => this.openTab(index)}>
                {tab.label}
              </button>
            );
          })}
        </div>
      );
    }
  
    
    private getCssClassMap(): CssClassMap {
        return {
          'tabs-list': true
        };
    }

}
