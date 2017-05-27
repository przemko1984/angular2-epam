import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { CourseHighlightDirective } from './course-highlight.directive';

@Component({
  template: `
  <h2 [courseHighlight]="dateNew">Course 1</h2>
  <h2 [courseHighlight]="dateUpcoming">Course 2</h2>
  <h2 [courseHighlight]="dateOld">Course 3</h2>
  `
})
class TestComponent {
    dateNew: Date;
    dateUpcoming: Date;
    dateOld: Date;

    constructor() {
        const currentDate: Date = new Date();
        const dayInMilisecond = 24 * 60 * 60 * 1000;

        this.dateNew = new Date(currentDate.getTime());
        this.dateUpcoming = new Date(currentDate.getTime() + 1 * dayInMilisecond);
        this.dateOld = new Date(currentDate.getTime() - 14 * dayInMilisecond - 1);

    }
 }

describe(`Directive courseHighlight`, () => {
    let comp: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl: any[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ CourseHighlightDirective, TestComponent ]
        })
        .createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached CourseHighlightDirective
        directiveEl = fixture.debugElement.queryAll(By.directive(CourseHighlightDirective));
    });

    it('should have 3 highlighted elements', () => {
        expect(directiveEl.length).toBe(3);
    });

    it('should 1st elements has style "course-new"', () => {
        const className = directiveEl[0].nativeElement.className;
        expect(className).toBe('course-new');
    });

    it('should 2nd elements has style "course-upcoming"', () => {
        const className = directiveEl[1].nativeElement.className;
        expect(className).toBe('course-upcoming');
    });

    it('should 3nd elements has style ""', () => {
        const className = directiveEl[2].nativeElement.className;
        expect(className).toBe('');
    });

});
