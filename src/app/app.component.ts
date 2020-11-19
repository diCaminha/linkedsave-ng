import { Component } from '@angular/core';
import { Link } from './models/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links: Link[] = [];

  onAddedLink(link:Link) {
    console.log("onSsss");
    this.links.push(link);
  }
}
