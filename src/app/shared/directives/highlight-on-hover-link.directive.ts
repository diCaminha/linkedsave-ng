import {
    Directive,
    ElementRef,
    Renderer2,
    OnInit,
    HostListener,
    HostBinding,
    Input
} from '@angular/core';

@Directive({
    selector: '[lsHighlightOver]'
})
export class HighlightOnHoverLinkDirective {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2) { }

    @HostListener('mouseenter') mouseover() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#69f0ae');
    }

    @HostListener('mouseleave') mouseleave() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    }
}