import { NgModule } from '@angular/core';
import { NotificationComponent }   from './components/notification.component';
import { Pattern } from './models/pattern';
import { AntiPattern } from './models/anti-pattern';
import { Wikidata } from './providers/wikidata';
import { Convenience } from './providers/convenience';

@NgModule({
    imports: [

    ],
    exports: [
            NotificationComponent,
            Pattern,
            AntiPattern,
            Wikidata,
            Convenience
    ],
    declarations: [
            NotificationComponent,
            Pattern,
            AntiPattern,
            Wikidata,
            Convenience
        ],
    providers: [    ],
})
export class Socius { }
