import {
	Component,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';

import { ICourse } from './../../business-entities';
import { CourseService, LoaderService } from './../../shared/services';

@Component({
	selector: 'course-list-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-list.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListPageComponent implements OnInit, OnDestroy {
	private courses: ICourse[];

	constructor(public ref: ChangeDetectorRef, private courseService: CourseService, private loaderService: LoaderService) {
		console.log('CourseListPageComponent: constructor');
	}

	public ngOnInit() {
		console.log('CourseListPageComponent: ngOnInit');
		this.loaderService.show();
		setTimeout(() => {
			this.loadCourses();
		}, 5000);

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
		console.log('loadCourses');
		this.courseService.getList().subscribe(
            (resp) => {
                this.courses = resp;
				this.ref.markForCheck();
            },
            (error) => {
                console.error('error', error);
            },
			() => {
				this.loaderService.hide();
				this.ref.markForCheck();
			}
        );
	}
}
