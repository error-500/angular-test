import { Injectable } from "@angular/core";
import { savedText } from "../saved-texts/saved-text";

interface apiRequest<URLSearchParams> {
    client: string, //gtx
    sl: string, // Source language - default auto
    tl: string, // Translate language
    dt: string, // default - t
    q: string | null // requered translation text
}
@Injectable({ providedIn: 'root' })
export class apiTranslate {
    private _authority = 'translate.googleapis.com';
    private _method = 'GET';
    private _path = '/translate_a/single';
    private _params: apiRequest<URLSearchParams> = {
        client: 'gtx',
        sl: 'auto',
        tl: window.navigator.language,
        dt: 't',
        q: 'текст'
    };
    constructor() { }
    get authority() { return this._authority; }
    get method() { return this._method; }
    get path() { return this._path; }
    get params() { return Object.assign({}, this._params); }

    set params(patch: Partial<apiRequest<URLSearchParams>>) {
        Object.assign(this._params, patch)
    }

    translate(text: string | null) {
        if (text) {
            this.params.q = text;
        }
        const requestUrl = new URL(this.path, `https://${this.authority}${this.path}`);
        const paramKeys = Object.keys(this.params);
        const query = paramKeys.map((key) => { return `${key}=${encodeURI(this.params[key])}` })
        requestUrl.search = query.join('&');

        const fetchRequest = new Request(requestUrl.toString(), {
            method: this.method,
            mode: 'no-cors',
            cache: 'no-cache',
        });

        return fetch(fetchRequest)
            .then(response => response.json())
            .then((data) => {
                const result: savedText = {
                    id: data[0][0][8][0][0][0],
                    name: "",
                    txtFrom: data[0][0][1],
                    txtTo: data[0][0][0],
                    lang: this.params.tl
                }
                return result;
            })


    }
}
