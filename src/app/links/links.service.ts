import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Link } from '../models/link';

@Injectable({
    providedIn: "root"
})
export class LinksService {
    private links: Link[] = [];
    private linksUpdate = new Subject<Link[]>();

    constructor(private http: HttpClient) { }

    getLinksUpdateListener() {
        return this.linksUpdate.asObservable();
    }

    getLinks() {
        this.http.get<{ message: string, data: Link[] }>(environment.API_URL + 'links')
            .subscribe(res => {
                this.links = res.data;
                this.linksUpdate.next(this.links);
            });
    }

    addLink(link: Link) {
        this.links.push(link);
        this.linksUpdate.next(this.links);
    }
}