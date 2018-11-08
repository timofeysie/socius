var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, keyframes, animate, Input } from '@angular/core';
var NotificationComponent = (function () {
    function NotificationComponent() {
        this.animationState = 'hidden';
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    NotificationComponent.prototype.show = function () {
        this.animationState = 'display';
    };
    return NotificationComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], NotificationComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NotificationComponent.prototype, "content", void 0);
NotificationComponent = __decorate([
    Component({
        selector: 'notification',
        template: "\n\n      <div class=\"notification\" [@showNotification]=\"animationState\">\n          <div>{{title}}</div>\n          {{content}}\n      </div>\n    ",
        styles: ["\n      .notification{position:fixed;right:20px;top:20px;background:tomato;padding:20px;font-family:Arial;color:#fff}.notification>div{font-size:20px;font-weight:700;margin-bottom:10px}\n    "],
        animations: [
            trigger('showNotification', [
                state('hidden', style({ transform: 'translateY(-150%)' })),
                state('display', style({ transform: 'translateX(150%)' })),
                transition('* => *', [
                    animate(3000, keyframes([
                        style({ opacity: 0, transform: 'translateY(-150%)', offset: 0 }),
                        style({ opacity: 0, transform: 'translateY(0%)', offset: .1 }),
                        style({ opacity: 1, transform: 'translateY(0%)', offset: 0.9 }),
                        style({ opacity: 1, transform: 'translateX(150%)', offset: 1 })
                    ]))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], NotificationComponent);
export { NotificationComponent };

//# sourceMappingURL=notification.component.js.map
