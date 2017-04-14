import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[courseHighlight]'
})
export class CourseHighlightDirective implements OnInit {

    @Input('courseHighlight') courseData: Date;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.setClassByDate();
    }

    private setClassByDate() {
        const currentDate: Date = new Date();
        const dayInMilisecond = 24 * 60 * 60 * 1000;
        const lastDay = new Date(currentDate.getTime() - 14 * dayInMilisecond);
        if (this.courseData < currentDate && this.courseData > lastDay) {
            this.el.nativeElement.classList.add('course-new');
        } else if (this.courseData > currentDate) {
            this.el.nativeElement.classList.add('course-upcoming');
        }
    }
}
