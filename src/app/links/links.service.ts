import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private links: Link[] = [];
  private counterReads: number = 0;
  private linksUpdate = new Subject<Link[]>();
  private counterUpdate = new Subject<number>();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService) {}

  getLinksUpdateListener() {
    return this.linksUpdate.asObservable();
  }

  getCounterUpdateListener() {
    return this.counterUpdate.asObservable();
  }

  getLinks() {
    this.http
      .get<{ message: string; data: any }>(environment.API_URL + 'links')
      .pipe(
        map((result) => {
          return result.data.map((link) => {
            return {
              title: link.title,
              linkUrl: link.linkUrl,
              description: link.description,
              image: link.image,
              source: link.source,
              logo: link.logo,
              id: link._id,
              read: link.read,
            };
          });
        })
      )
      .subscribe((links) => {
        this.links = links;
        this.linksUpdate.next(this.links);
        this.counterUpdate.next(this.counterReads);
      });
  }

  getCounterLinks() {
    this.http
      .get<{ data: number }>(environment.API_URL + 'links/reads')
      .subscribe((result) => {
        this.counterUpdate.next(result.data);
        this.counterReads = result.data;
      });
  }

  addLink(link: Link) {
    this.http
      .post<{ message: string; data: Link }>(
        environment.API_URL + 'links',
        link
      )
      .subscribe((res) => {
        this.links.push(res.data);
        this.linksUpdate.next(this.links);
        this.counterUpdate.next(this.counterReads);
        this.router.navigate(['/']);
      }, err => {
        this.authService.logout();
        this.router.navigate(['/']);
      });
  }

  deleteLink(id) {
    let linksBkp = [...this.links];
    this.links = this.links.filter((l) => l.id !== id);
    this.linksUpdate.next(this.links);

    this.http.delete(environment.API_URL + 'links/' + id).subscribe(
      (res) => {
        this.linksUpdate.next(this.links);
      },
      (err) => {
        this.links = linksBkp;
        this.linksUpdate.next(this.links);
      }
    );
  }

  readLink(linkId: string) {
    const linkToRead = this.links.find(l => l.id == linkId);
    if (!linkToRead.read) {
      let linksBkp = [...this.links];
      this.links.map((l) => {
        if (l.id === linkId) l.read = true;
      });
      this.linksUpdate.next(this.links);
      this.http
        .put(environment.API_URL + 'links/' + linkId + '/read', { linkId })
        .subscribe(
          (res) => {
            this.getCounterLinks();
          },
          (err) => {
            this.links = linksBkp;
            this.linksUpdate.next(this.links);
          }
        );
    }
  }

  getMetadataLink(url: string): Observable<{ data: Link }> {
    return this.http.get<{ data: Link }>(
      environment.API_URL + 'links/meta?url=' + url
    );
  }
}
