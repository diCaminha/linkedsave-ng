import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Link } from 'src/app/models/link';
import { LinksService } from '../links.service';

@Component({
    styleUrls: ['./link-create.component.css'],
    selector: 'ls-link-create',
    templateUrl: './link-create.component.html',
})
export class LinkCreateComponent {

    newLink = 'NO CONTENT';

    constructor(private linksService: LinksService) {}

    onAddLink(form: NgForm) {
        if(form.invalid) {
            return;
        }
        const link: Link = {
            id: 24342,
            title: form.value.title,
            linkUrl: form.value.linkUrl
        }
        this.linksService.addLink(link);
    }
}