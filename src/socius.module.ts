import { NgModule } from '@angular/core';
import { NotificationComponent }   from './components/notification.component';
import { Pattern } from './models/pattern';
import { AntiPattern } from './models/anti-pattern';

@NgModule({
    imports: [

    ],
    exports: [
            NotificationComponent,
            Pattern,
            AntiPattern
    ],
    declarations: [
            NotificationComponent,
            Pattern,
            AntiPattern
        ],
    providers: [    ],
})
export class Socius { }
