import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Wikidata {
  // Based on the example by [Lopez Hugo](https://gist.github.com/hugolpz/b04b086ea8e4aefd1358)
  // 1. API'S URL:
  // 1a.Parts of the url:
  wd = "http://www.wikidata.org/w/api.php?";
  wp = "http://en.wikipedia.org/w/api.php?"; // list of iso-code = ? 
  aw = "action=wbgetentities" ; // rather wdpoint
  aq = "action=query" ; // ?rather wppage
  ts = "&sites=enwiki" ; // wd only&required. // list of wiki-code = ? 
  t = "&titles=" // target, wd|wp
  i = "Dragon"; //item, wd|wp
  l  = "&languages=zh|zh-classical|zh-cn|zh-hans|zh-hant|zh-hk|zh-min-nan|zh-mo|zh-my|zh-sg|zh-tw|fr" ; // wdpoint only
  ps = "&props=sitelinks|labels|aliases|descriptions" ; // wdpoint only
  //sitelinks: all interwikis
  //labels: title without _(tag), for l (languages) only
  //aliases: label of redirect page
  p = "&prop=extracts&exintro&explaintext&exsentences=10" ; // wppage only
  r = "&redirects&converttitles" ; // wppage only
  c = "&callback=?" // wd|wp
  f = "&format=json" // wd|wp

  constructor(@Inject(Http) public http: Http) {
    //1b. Compose your url:
    let urlwd = this.wd+
                this.aw+
                this.ts+
                this.t+
                this.i+
                this.l+
                this.ps+
                this.c+
                this.f; // typical wd query
    let url   = this.wp+
                this.aq+
                this.t+
                this.i+
                this.p+
                this.r+
                this.c+
                this.f; // typical wp query
    // Examples print in console:
    console.log("1. WD: "+urlwd);
    console.log("2. WP: "+url);
  }

  getData(item) {
      return new Promise((resolve, reject) => {
      let url = this.wp+
                this.aq+
                this.t+
                item+
                this.p+
                this.r+
                this.c+
                this.f;
      console.log(url);
      this.http.get(url, (json) => {
          var item_id = Object.keys(json.query.pages)[0]; 
          let extract = json.query.pages[item_id].extract;
          let result = "<b>En :</b> <t>" + item + "</t> <b>⇒</b> " + extract;
          resolve(result);
      });
    });
  }

  // 2b. Single query (alternative code):
  singleQuery(item) {
    return new Promise((resolve, reject) => {
        //var be = item
        let url_tpl = 
          this.wp+
          this.aq+
          this.t+ 
          item+
          this.p+
          this.r+
          this.c+
          this.f;
        this.http.get(url_tpl, (data) => {
            console.log('data',data);
            resolve(data);
        });
    });
  }

}