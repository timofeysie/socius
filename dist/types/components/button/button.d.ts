import '../../stencil.core';
export declare class Button {
    type: 'button' | 'reset' | 'submit';
    color: 'primary' | 'accent' | 'light';
    shape: 'square' | 'round';
    size: 'small' | 'default' | 'large';
    disabled: boolean;
    handleClick(): void;
    render(): JSX.Element;
    private getCssClassMap;
}
