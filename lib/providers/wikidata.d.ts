import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
export declare class Wikidata {
    private http;
    wd: string;
    wp: string;
    aw: string;
    aq: string;
    ts: string;
    t: string;
    i: string;
    l: string;
    ps: string;
    p: string;
    r: string;
    c: string;
    f: string;
    constructor(http: Http);
    getData(item: any): Promise<{}>;
    singleQuery(item: any): Promise<{}>;
}
