import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { map } from 'rxjs/operators';
import { title } from 'process';
import { Subject } from 'rxjs';

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
        this.http.get<{ message: string, data: any }>(environment.API_URL + 'links')
            .pipe(map((result) => {
                return result.data.map(link => {
                    return {
                        title: link.title,
                        linkUrl: link.linkUrl,
                        id: link._id
                    }
                });
            }))
            .subscribe(links => {
                this.links = links;
                this.linksUpdate.next(this.links);
            });
    }

    addLink(link: Link) {
        this.http.post<{ message: string, data: Link }>(environment.API_URL + 'links', link).subscribe(res => {
            this.links.push(res.data);
            this.linksUpdate.next(this.links);
        })
    }

    deleteLink(id) {
        let linksBkp = [...this.links];
        this.links = this.links.filter(l => l.id !== id);
        this.linksUpdate.next(this.links);

        this.http.delete(environment.API_URL + 'links/' + id).subscribe(res => {
            this.linksUpdate.next(this.links);
        }, err => {
            console.log(err);
            this.links = linksBkp;
            this.linksUpdate.next(this.links);
        });
    }
}