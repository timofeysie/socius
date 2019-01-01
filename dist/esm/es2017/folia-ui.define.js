
// FoliaUi: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './folia-ui.core.js';
import {
  Button,
  Item,
  Tab,
  Tabs
} from './folia-ui.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    Button,
    Item,
    Tab,
    Tabs
  ], opts);
}
