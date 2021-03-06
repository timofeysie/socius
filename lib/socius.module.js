var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NotificationComponent } from './components/notification.component';
import { Pattern } from './models/pattern';
import { AntiPattern } from './models/anti-pattern';
import { Wikidata } from './providers/wikidata';
var Socius = (function () {
    function Socius() {
    }
    return Socius;
}());
Socius = __decorate([
    NgModule({
        imports: [],
        exports: [
            NotificationComponent,
            Pattern,
            AntiPattern,
            Wikidata
        ],
        declarations: [
            NotificationComponent,
            Pattern,
            AntiPattern,
            Wikidata
        ],
        providers: [],
    })
], Socius);
export { Socius };

//# sourceMappingURL=socius.module.js.map
