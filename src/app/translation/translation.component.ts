import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { savedText } from "../saved-texts/saved-text";
import { textsList } from "../saved-texts/saved-texts";
import { apiTranslate } from "./translation.service";
@Component({
    selector: 'app-translation',
    templateUrl: './translation.component.html',
    providers: [
        apiTranslate
    ]
})

export class AppTranslation {
    public lang: string;
    public txtFrom: string;
    public txtTo: string;
    public name: string | null;
    protected id: string | null;

    constructor(public service: apiTranslate) {
        service.translate(this.txtFrom).then((text) => this.txtTo = text.txtTo)
    }
    saveText() {
        const savedTextsList = new textsList();
        const newtxt: savedText = {
            txtFrom: this.txtFrom,
            txtTo: this.txtTo,
            name: this.name,
            id: this.id,
            lang: this.lang
        };
        savedTextsList.save(newtxt);
    }
    doTranslate() {
        this.service.translate(this.txtFrom).then((text) => {
            this.txtTo = text.txtTo;
            this.id = text.id;
        });
    }
}
