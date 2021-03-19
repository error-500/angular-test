import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { savedText } from './saved-text';
import { SavedTextsService } from './saved-texts.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component(
    {
        selector: 'app-saved-texts',
        templateUrl: './saved-texts.component.html',
        providers: [
            SavedTextsService,
            DecimalPipe,
        ]
    }
)
export class AppSavedTexts {
    rows$: Observable<savedText[]>;
    total$: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: SavedTextsService) {
        this.rows$ = service.list$;
        this.total$ = service.total$;
    }

    onSort({ column, direction }: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }
    loadText(id: string) {
        const text = JSON.parse(JSON.stringify(this.rows$))
            .find((item: savedText) => { return item.id === id })
    }
}
