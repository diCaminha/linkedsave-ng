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
    isLoading: boolean = false;

    constructor(private linksService: LinksService) { }

    onAddLink(form: NgForm) {
        this.isLoading = true;
        if (form.invalid) {
            return;
        }
        const link: Link = {
            id: null,
            title: null,
            linkUrl: form.value.linkUrl,
            source: null,
            description: null,
            image: null,
            logo: null
        }
        this.linksService.addLink(link);
    }
}