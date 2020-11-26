import {AfterContentChecked, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[inputAutoFocus]'
})
export class InputFocusDirective implements AfterContentChecked {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngAfterContentChecked(): void {
    this.element.nativeElement.focus();
  }
}