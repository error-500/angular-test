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
        });
    }
    showOneCollapsed(selector) {
        document.querySelectorAll('.collapse.show').forEach((item) => {
            item.classList.remove('show');
        });
        const target = document.querySelector(selector);
        if (target && target.className.split(' ').indexOf('show') === -1) {
            target.classList.add('show')
        }
    }
    ngOnInit() { }
}
