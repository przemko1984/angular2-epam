import {
	Component,
	ViewEncapsulation,
	OnInit,
	OnDestroy
} from '@angular/core';

import { ICourse } from './../../business-entities';
import { CourseService } from './../../shared/services';

@Component({
	selector: 'course-list-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-list.template.html')
})
export class CourseListPageComponent implements OnInit, OnDestroy {
	private courses: ICourse[];

	constructor(private courseService: CourseService) {
		console.log('CourseListPageComponent: constructor');
	}

	public ngOnInit() {
		console.log('CourseListPageComponent: ngOnInit');
		this.loadCourses();
	}

	public ngOnDestroy() {
		console.log('CourseListPageComponent: ngOnInit');
	}

	// other hooks
	// public ngOnChanges() {
	// 	console.log('CourseListPageComponent: ngOnDestroy');
	// }
	// public ngDoCheck() {
	// 	console.log('CourseListPageComponent: ngDoCheck');
	// }
	// public ngAfterContentInit() {
	// 	console.log('CourseListPageComponent: ngAfterContentInit');
	// }
	// public ngAfterContentChecked() {
	// 	console.log('CourseListPageComponent: ngAfterContentChecked');
	// }
	// public ngAfterViewInit() {
	// 	console.log('CourseListPageComponent: ngAfterViewInit');
	// }
	// public ngAfterViewChecked() {
	// 	console.log('CourseListPageComponent: ngAfterViewChecked');
	// }

	// other stuff
	public deleteCourse(id: string) {
		console.log('Delete course id:', id);
		this.courseService.remove(id);
	}

	public editCourse(id: string) {
		console.log('Edit course id:', id);
		this.courseService.update(id);
	}

	private loadCourses() {
		this.courseService.getList().subscribe(
            (resp) => {
                this.courses = resp;
            },
            (error) => {
                console.error('error', error);
            }
        );
	}
}
