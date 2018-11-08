var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
var Wikidata = (function () {
    function Wikidata(http) {
        this.http = http;
        this.wd = "http://www.wikidata.org/w/api.php?";
        this.wp = "http://en.wikipedia.org/w/api.php?";
        this.aw = "action=wbgetentities";
        this.aq = "action=query";
        this.ts = "&sites=enwiki";
        this.t = "&titles=";
        this.i = "Dragon";
        this.l = "&languages=zh|zh-classical|zh-cn|zh-hans|zh-hant|zh-hk|zh-min-nan|zh-mo|zh-my|zh-sg|zh-tw|fr";
        this.ps = "&props=sitelinks|labels|aliases|descriptions";
        this.p = "&prop=extracts&exintro&explaintext&exsentences=10";
        this.r = "&redirects&converttitles";
        this.c = "&callback=?";
        this.f = "&format=json";
        var urlwd = this.wd +
            this.aw +
            this.ts +
            this.t +
            this.i +
            this.l +
            this.ps +
            this.c +
            this.f;
        var url = this.wp +
            this.aq +
            this.t +
            this.i +
            this.p +
            this.r +
            this.c +
            this.f;
        console.log("1. WD: " + urlwd);
        console.log("2. WP: " + url);
    }
    Wikidata.prototype.getData = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.wp +
                _this.aq +
                _this.t +
                item +
                _this.p +
                _this.r +
                _this.c +
                _this.f;
            console.log(url);
            _this.http.get(url, function (json) {
                var item_id = Object.keys(json.query.pages)[0];
                var extract = json.query.pages[item_id].extract;
                var result = "<b>En :</b> <t>" + item + "</t> <b>⇒</b> " + extract;
                resolve(result);
            });
        });
    };
    Wikidata.prototype.singleQuery = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url_tpl = _this.wp +
                _this.aq +
                _this.t +
                item +
                _this.p +
                _this.r +
                _this.c +
                _this.f;
            _this.http.get(url_tpl, function (data) {
                console.log('data', data);
                resolve(data);
            });
        });
    };
    return Wikidata;
}());
Wikidata = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], Wikidata);
export { Wikidata };

//# sourceMappingURL=wikidata.js.map
