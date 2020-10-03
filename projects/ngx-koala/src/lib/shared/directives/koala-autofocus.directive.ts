import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[koalaAutoFocus]'
})
export class KoalaAutofocusDirective implements AfterContentInit {
	@Input() public koalaAutoFocus: boolean;
	
	public constructor(private el: ElementRef) {}
	
	public ngAfterContentInit() {
		if (this.koalaAutoFocus) {
			setTimeout(() => {
				this.el.nativeElement.focus();
			}, 500);
		}
	}
}
