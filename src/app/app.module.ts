import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './nav-bar/nav-bar.component';
import { AppSavedTexts } from './saved-texts/saved-texts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppTranslation } from './translation/translation.component';
@NgModule({
    declarations: [
        AppComponent,
        AppNavbarComponent,
        AppSavedTexts,
        AppTranslation,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
