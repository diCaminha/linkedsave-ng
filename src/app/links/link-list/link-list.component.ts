import { Component, Input } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'ls-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent {

    @Input() links: Link[] = [];
}
