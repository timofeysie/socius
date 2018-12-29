/*! Built with http://stenciljs.com */
const { h } = window.FoliaUi;

class Tab {
    static get is() { return "folia-tab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "active": {
            "type": Boolean,
            "attr": "active"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "reflectToAttr": true
        },
        "label": {
            "type": String,
            "attr": "label"
        }
    }; }
}

export { Tab as FoliaTab };
