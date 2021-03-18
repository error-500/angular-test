import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { apiTranslate } from "./translation.service";

@Component({
    selector: 'app-translation',
    templateUrl: './translation.component.html',
    providers: [
        apiTranslate
    ]
})

export class appTranslation {
    textFrom: Observable<string>;
    textTo: Observable<string>;
    name: string | null;

    saveText() {

    }
    doTranslate() {

    }
}
