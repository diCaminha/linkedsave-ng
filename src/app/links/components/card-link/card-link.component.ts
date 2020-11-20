import { Component, Input } from '@angular/core';
import { Link } from 'src/app/models/link';
import { LinksService } from '../../links.service';

@Component({
    selector: 'ls-card-link',
    templateUrl: './card-link.component.html',
    styleUrls: ['./card-link.component.css']
})
export class CardLinkComponent {

    @Input()
    link: Link;

    constructor(private linksService: LinksService) { }

    onDeleteLink() {
        this.linksService.deleteLink(this.link.id);
    }

    visitPage() {
        window.open(this.link.linkUrl, "_blank");
    }
}