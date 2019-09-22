import { EventEmitter } from '../../stencil.core';
export declare class Tabs {
    el: HTMLElement;
    tabs: HTMLFoliaTabElement[];
    onChange: EventEmitter;
    componentWillLoad(): void;
    /**
     *
     * @param index
     * listen to this event outside of this component and react to it as follows:
     * const tabs = document.querySelector('mtn-tabs');
     * tabs.addEventListener('change', event => {
     * // the emitted object will be under event.detail
     * console.log(`CHANGED TABS TO INDEX ${event.detail.tabId}`);
     * });
     */
    openTab(index: number): void;
    render(): any;
    private getCssClassMap;
}
