/*! Built with http://stenciljs.com */
const { h } = window.CurchodUi;

class Button {
    render() {
        return (h("button", null,
            h("slot", null, "Click Me!")));
    }
    static get is() { return "curchod-button"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return ""; }
}

export { Button as CurchodButton };
