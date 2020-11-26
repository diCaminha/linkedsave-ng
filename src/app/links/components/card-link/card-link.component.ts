import { Component, Input } from '@angular/core';
import { url } from 'inspector';
import { Link } from 'src/app/models/link';
import { LinksService } from '../../links.service';

@Component({
  selector: 'ls-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.css'],
})
export class CardLinkComponent {
  @Input()
  link: Link;
  @Input()
  isPreview: boolean = false;

  constructor(private linksService: LinksService) {}

  onDeleteLink() {
    this.linksService.deleteLink(this.link.id);
  }

  visitPage() {
    this.linksService.readLink(this.link.id);
    window.open(this.link.linkUrl, '_blank');
  }

  copyLinkUrl(linkUrl: HTMLInputElement) {
    linkUrl.hidden = false;
    linkUrl.select();
    document.execCommand('copy');
    linkUrl.hidden = true;
  }
}
