import { Component, Input, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link';
import { LinksService } from '../links.service';

@Component({
  selector: 'ls-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  links: Link[] = [];

  constructor(private linksService: LinksService) { }

  ngOnInit() {
    this.linksService.getLinks();
    this.linksService.getLinksUpdateListener().subscribe(links => {
      this.links = links;
    })
  }


}
