/*! Built with http://stenciljs.com */
import { h } from '../folia-ui.core.js';

class Item {
    render() {
        return (h("div", null, this.label));
    }
    static get is() { return "folia-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "description": {
            "type": String,
            "attr": "description"
        },
        "label": {
            "type": String,
            "attr": "label"
        }
    }; }
    static get style() { return ".sc-folia-item-h{-webkit-box-sizing:border-box;box-sizing:border-box}[disabled].sc-folia-item-h{pointer-events:none}button.sc-folia-item{min-height:4vw;min-width:20%;font-family:Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif;cursor:pointer;border:none;background-color:#68c3c0;color:#fff;line-height:20px;font-size:14px;padding:4px 12px;border-radius:3px}button.sc-folia-item:hover{background-color:#33807d}button.sc-folia-item:active{background-color:#2c6e6b}button.sc-folia-item:disabled{opacity:.4}button.sc-folia-item:disabled.accent{background-color:#f25346}button.sc-folia-item:disabled.accent:hover{background-color:#c75943}button.sc-folia-item:disabled.accent:active{background-color:#a64531}button.sc-folia-item:disabled.light{background-color:#d8d0d1;color:rgba(0,0,0,.7)}button.sc-folia-item:disabled.light:hover{background-color:#7d686b}button.sc-folia-item:disabled.light:active{background-color:#615153}button.sc-folia-item:disabled.round{border-radius:50px}button.sc-folia-item:disabled.small{padding:2px 8px;font-size:12px}button.sc-folia-item:disabled.large{padding:8px 20px;font-size:16px}"; }
}

export { Item as FoliaItem };
