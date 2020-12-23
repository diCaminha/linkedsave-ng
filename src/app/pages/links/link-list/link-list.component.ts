import { Component, Input, OnInit } from '@angular/core';
import { Link } from 'src/app/core/models/link';
import { LinksService } from 'src/app/links/links.service';

@Component({
  selector: 'ls-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent implements OnInit {
  links: Link[] = [];
  quantityReads: number = 0;

  constructor(private linksService: LinksService) {}

  ngOnInit() {
    this.linksService.getLinks();
    this.linksService.getCounterLinks();
    this.linksService.getLinksUpdateListener().subscribe((links) => {
      this.links = links;
    });
    this.linksService.getCounterUpdateListener().subscribe((quantityReads) => {
      this.quantityReads = quantityReads;
    });
  }
}
