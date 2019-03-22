export class Tabs {
    constructor() {
        this.tabs = [];
    }
    componentWillLoad() {
        // Grab tabs from this component
        this.tabs = Array.from(this.el.querySelectorAll('folia-tab'));
        if (this.tabs.length === 0) {
            throw new Error('[folia-tabs] Must have at least one tab');
        }
    }
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
    openTab(index) {
        if (index >= this.tabs.length) {
            throw new Error(`[folia-tabs] Index ${index} is out of bounds of tabs length`);
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
        console.log('classMap', classMap);
        return (h("div", { class: classMap }, this.tabs.map((tab, index) => {
            const tabClassMap = {
                'tab-button': true,
                active: tab.active
            };
            return (h("button", { role: "tab", disabled: tab.disabled, class: tabClassMap, onClick: () => this.openTab(index) }, tab.label));
        })));
    }
    getCssClassMap() {
        return {
            'tabs-list': true
        };
    }
    static get is() { return "folia-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "openTab": {
            "method": true
        },
        "tabs": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "change",
            "method": "onChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
