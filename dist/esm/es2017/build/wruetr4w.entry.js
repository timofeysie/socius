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
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host([disabled]){pointer-events:none}button{min-height:4vw;min-width:20%;font-family:Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif;cursor:pointer;border:none;background-color:#68c3c0;color:#fff;line-height:20px;font-size:14px;padding:4px 12px;border-radius:3px}button:hover{background-color:#33807d}button:active{background-color:#2c6e6b}button:disabled{opacity:.4}button:disabled.accent{background-color:#f25346}button:disabled.accent:hover{background-color:#c75943}button:disabled.accent:active{background-color:#a64531}button:disabled.light{background-color:#d8d0d1;color:rgba(0,0,0,.7)}button:disabled.light:hover{background-color:#7d686b}button:disabled.light:active{background-color:#615153}button:disabled.round{border-radius:50px}button:disabled.small{padding:2px 8px;font-size:12px}button:disabled.large{padding:8px 20px;font-size:16px}"; }
}

export { Item as FoliaItem };
