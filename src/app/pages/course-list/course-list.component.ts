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
import { FilterByNamePipe } from './../../shared/pipes/filterByName.pipe';

@Component({
	selector: 'course-list-page',
	encapsulation: ViewEncapsulation.None,
	template: require('./course-list.template.html'),
	styles: [require('./course-list.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListPageComponent implements OnInit, OnDestroy {
	private courses: ICourse[];
	private coursesClone: ICourse[];

	constructor(
		private ref: ChangeDetectorRef,
		private courseService: CourseService,
		private loaderService: LoaderService,
		private filterByName: FilterByNamePipe
	) {
		console.log('CourseListPageComponent: constructor');
	}

	public ngOnInit() {
		console.log('CourseListPageComponent: ngOnInit');
		this.subscribeCoursesList();
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
		this.loaderService.show();
		this.courseService.remove(id).subscribe(
			(resp) => {
				this.loaderService.hide();
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
	}

	public editCourse(id: string) {
		console.log('Edit course id:', id);
		this.loaderService.show();
		this.courseService.update(id).subscribe(
			(resp) => {
				this.loaderService.hide();
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
	}

	public addCourse() {
		console.log('Add course');
		this.loaderService.show();
		this.courseService.create().subscribe(
			(resp) => {
				this.loaderService.hide();
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
	}

	public searchCourse(name: string) {
		this.courses = this.filterByName.transform(this.coursesClone, name);
		// Service example with filterByName pipe
		// this.loaderService.show();
		// this.courseService.search(name);
	}

	private subscribeCoursesList() {
		console.log('subscribe course list');
		this.loaderService.show();
		this.courseService.getList()
			.subscribe(
				(resp) => {
					this.courses = resp;
					this.coursesClone = resp.slice();
					this.loaderService.hide();
					this.ref.markForCheck();
				},
				(error) => {
					console.error('error', error);
					this.loaderService.hide();
				}
			);
	}

	private loadCourses() {
		console.log('loadCourses');
		this.courseService.loadList();
	}
}
