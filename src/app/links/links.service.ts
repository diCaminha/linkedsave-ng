import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Link } from '../models/link';

@Injectable({
    providedIn: "root"
})
export class LinksService {
    private links: Link[] = [];
    private linksUpdate = new Subject<Link[]>();

    getLinksUpdateListener() {
        return this.linksUpdate.asObservable();
    }

    getLinks() {
        return [...this.links];
    }

    addLink(link:Link) {
        this.links.push(link);
        this.linksUpdate.next(this.links);
    }
}