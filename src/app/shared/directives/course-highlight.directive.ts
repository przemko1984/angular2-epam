import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[courseHighlight]'
})
export class CourseHighlightDirective implements OnInit {

    // public elem: HTMLElement;
    // @Input('courseHighlight') courseData: Date;

    constructor(private el: ElementRef) {
        // this.elem = this.el.nativeElement;
    }

    ngOnInit() {
        this.el.nativeElement.classList.add('course-new');
    }
}
