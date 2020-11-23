import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    linkForm: FormGroup = this.formBuilder.group({
        linkUrl: ['', Validators.required],
    });

    constructor(private linksService: LinksService, private formBuilder: FormBuilder) { }

    onAddLink() {
        this.isLoading = true;
        if (this.linkForm.invalid) {
            return;
        }

        if (!this.isValidUrl()) {
            console.log("not valid url");
            this.isLoading = false;
            this.linkForm.controls['linkUrl'].setErrors({ 'incorrect': true });
            return;
        }

        const link: Link = {
            id: null,
            title: null,
            linkUrl: this.linkForm.value['linkUrl'],
            source: null,
            description: null,
            image: null,
            logo: null,
            read: false,
            userId: null
        }
        this.linksService.addLink(link);
    }

    isValidUrl() {
        try {
            new URL(this.linkForm.value['linkUrl'],);
        } catch (_) {
            return false;
        }

        return true;
    }

    getErrorMessage() {
        return "Invalid URL. Please paste a correct link."
    }
}