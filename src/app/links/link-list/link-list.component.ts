import { Component } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'ls-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent {

    links: Link[] = [
        {id:1, title: 'How Change Angular Material Theme', linkUrl: 'https://examplelink.com'},
        {id:2, title: 'How Change Angular Material Theme', linkUrl: 'https://examplelink.com'},
        {id:3, title: 'How Change Angular Material Theme', linkUrl: 'https://examplelink.com'},
        {id:4, title: 'How Change Angular Material Theme', linkUrl: 'https://examplelink.com'},
        {id:5, title: 'How Change Angular Material Theme', linkUrl: 'https://examplelink.com'},
    ];
}
