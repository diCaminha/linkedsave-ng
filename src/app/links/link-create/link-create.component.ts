import { Component } from '@angular/core';

@Component({
    selector: 'ls-link-create',
    templateUrl: './link-create.component.html',
})
export class LinkCreateComponent {

    onAddLink() {
        console.log("onAddLink function called");
    }
}