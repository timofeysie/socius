import { NgModule } from '@angular/core';

import { NotificationComponent }   from './components/notification.component';
import { Pattern } from './models/pattern';
import { AntiPattern } from './models/anti-pattern';
import { Wikidata } from './providers/wikidata';

@NgModule({
    imports: [

    ],
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
    providers: [    ],
})
export class Socius { }
