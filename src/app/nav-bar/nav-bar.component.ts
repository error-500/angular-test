import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
})
export class AppNavbarComponent implements OnInit {
    constructor() { }
    toggleCollapse(selector) {
        document.querySelectorAll(selector).forEach((item) => {
            item.classList.toggle('show');
        })
    }
    ngOnInit() { }
}
