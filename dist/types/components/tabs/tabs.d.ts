import '../../stencil.core';
export declare class Tabs {
    el: HTMLElement;
    tabs: HTMLFoliaTabElement[];
    componentWillLoad(): void;
    openTab(index: number): void;
    render(): JSX.Element;
    private getCssClassMap;
}
