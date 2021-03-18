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
    private authority = 'translate.googleapis.com';
    private method = 'GET';
    private path = '/translate_a/single';
    private params: apiRequest<URLSearchParams> = {
        client: 'gtx',
        sl: 'auto',
        tl: window.navigator.language,
        dt: 't',
        q: null
    };
    constructor(params: apiRequest<URLSearchParams>) {
        Object.assign(this.params, params);
    }

    async translate(text: string | null) {
        if (text) {
            this.params.q = encodeURI(text)
        }
        const requestUrl = new URL(this.path, `https://${this.authority}${this.path}`);
        requestUrl.search = this.params.toString();
        const fetchRequest = new Request(requestUrl.toString(), {
            method: this.method,
            mode: 'cors',
            cache: 'no-cache',
        });

        return await fetch(fetchRequest)
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
