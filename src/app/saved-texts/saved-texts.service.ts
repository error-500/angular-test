import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { savedText } from './saved-text';
import { textsList } from './saved-texts';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
    rows: savedText[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(rows: savedText[], column: SortColumn, direction: string): savedText[] {
    if (direction === '' || column === '') {
        return rows;
    } else {
        return [...rows].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(row: savedText, term: string, pipe: PipeTransform) {
    return row.name.toLowerCase().includes(term.toLowerCase())
        || pipe.transform(row.txtFrom).includes(term)
        || pipe.transform(row.txtTo).includes(term);
}

@Injectable({ providedIn: 'root' })
export class SavedTextsService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _list$ = new BehaviorSubject<savedText[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._list$.next(result.rows);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    get list$() { return this._list$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let list = new textsList();
        let rows = sort(list.load(), sortColumn, sortDirection);

        // 2. filter
        rows = rows.filter(country => matches(country, searchTerm, this.pipe));
        const total = rows.length;

        // 3. paginate
        rows = rows.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ rows, total });
    }
}
