import { Injectable } from '@angular/core';
import { Link } from '../models/link';

@Injectable({
    providedIn: "root"
})
export class LinksService {
    private links: Link[] = [];

    getLinks() {
        return [...this.links];
    }

    addLink(link:Link) {
        this.links.push(link);
    }
}