import { savedText } from './saved-text';
export class textsList {
    texts: savedText[];
    constructor() {
        this.texts = [];
    }

    load() {
        const myStore = window.localStorage;
        let data = myStore.getItem('savedTexts');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }
    save(text: savedText) {
        if (!text.id) {
            text.id = this.texts.length;
        }
        this.texts.push(text);
        const myStore = window.localStorage;
        try {
            myStore.setItem('savedTexts', JSON.stringify(this.texts));
        } catch (e) {
            window.alert(e.toString())
        }
        return this.texts
    }
}
