/*! Built with http://stenciljs.com */
import { h } from '../folia-ui.core.js';

class Button {
    constructor() {
        this.type = 'button';
        this.color = 'primary';
        this.shape = 'square';
        this.size = 'default';
    }
    handleClick() {
        console.log('Received the button click.');
    }
    componentWillLoad() {
    }
    componentDidLoad() {
    }
    componentWillEnter() {
    }
    componentDidEnter() {
    }
    componentWillLeave() {
    }
    componentDidLeave() {
    }
    componentDidUnload() {
    }
    render() {
        const classMap = this.getCssClassMap();
        return (h("button", { type: this.type, class: classMap, disabled: this.disabled, onClick: () => this.handleClick() },
            h("slot", null)));
    }
    getCssClassMap() {
        return {
            [this.color]: true,
            [this.shape]: true,
            [this.size]: true
        };
    }
    static get is() { return "folia-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "shape": {
            "type": String,
            "attr": "shape"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "type": {
            "type": String,
            "attr": "type",
            "reflectToAttr": true
        }
    }; }
    static get style() { return ".sc-folia-button-h{-webkit-box-sizing:border-box;box-sizing:border-box}[disabled].sc-folia-button-h{pointer-events:none}button.sc-folia-button:focus{outline:0}button.sc-folia-button{min-height:4vw;min-width:20%;font-family:Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif;cursor:pointer;border:none;background-color:#68c3c0;color:#fff;line-height:20px;font-size:14px;padding:4px 12px;border-radius:3px}button.sc-folia-button:hover{background-color:#33807d}button.sc-folia-button:active{background-color:#2c6e6b}button.sc-folia-button:disabled{opacity:.4}button.accent.sc-folia-button{background-color:#f25346}button.accent.sc-folia-button:hover{background-color:#c75943}button.accent.sc-folia-button:active{background-color:#a64531}button.light.sc-folia-button{background-color:#d8d0d1;color:rgba(0,0,0,.7)}button.light.sc-folia-button:hover{background-color:#7d686b}button.light.sc-folia-button:active{background-color:#615153}button.round.sc-folia-button{border-radius:50px}button.small.sc-folia-button{padding:2px 8px;font-size:12px}button.large.sc-folia-button{padding:8px 20px;font-size:16px}"; }
}

export { Button as FoliaButton };
