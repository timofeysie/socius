import { Injectable, Inject } from '@angular/core';

@Injectable()
export class Convenience {

    constructor() { }
    /**
    * @param description 
    * @returns the description without any [1] footnote markers.
    */
    removeFootnotes(description: string) {
        if (description) {
            const indexOfBracket = description.indexOf('[');
            if (indexOfBracket !== -1) {
                return description.substring(0, indexOfBracket);
            } else {
                return description;
            }
        }
    }
}
