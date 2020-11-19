import { Component } from '@angular/core';

@Component({
    selector: 'ls-link-create',
    templateUrl: './link-create.component.html',
})
export class LinkCreateComponent {

    newLink = 'NO CONTENT';
    enteredValue: string = '';

    onAddLink() {
        console.log(this.enteredValue);
    }
}