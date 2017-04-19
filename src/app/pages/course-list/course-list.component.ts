import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';

import { BasePage } from '../base.page.component';
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
export class CourseListPageComponent extends BasePage {
	private courses: ICourse[] = [];
	// private coursesClone: ICourse[];
	private loadMoreCounter: number = 1;
	private isCourseListFull: boolean = false;
	private search: string;

	constructor(
		private ref: ChangeDetectorRef,
		private courseService: CourseService,
		private loaderService: LoaderService,
		private filterByName: FilterByNamePipe
	) {
		super();
		console.log('CourseListPageComponent: constructor');
	}

	onInit() {
		console.log('CourseListPageComponent: ngOnInit');
		this.subscribeCoursesList();
		this.loadCourses();
	}

	onDestroy() {
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
	public deleteCourse(id: number) {
		console.log('Delete course id:', id);
		this.loaderService.show();
		let sub = this.courseService.remove(id).subscribe(
			(resp) => {
				this.loaderService.hide();
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
		this.registerSubscription(sub);
	}

	public editCourse(id: number) {
		console.log('Edit course id:', id);
		this.loaderService.show();
		let sub = this.courseService.update(id).subscribe(
			(resp) => {
				this.loaderService.hide();
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
		this.registerSubscription(sub);
	}

	public addCourse() {
		console.log('Add course');
		// this.loaderService.show();
		// let sub = this.courseService.create().subscribe(
		// 	(resp) => {
		// 		this.loaderService.hide();
		// 	},
		// 	(error) => {
		// 		this.loaderService.hide();
		// 		console.error('error', error);
		// 	}
		// );
		// this.registerSubscription(sub);
	}

	public searchCourse(name: string) {
		// this.courses = this.filterByName.transform(this.coursesClone, name);
		this.loaderService.show();
		this.resetCourseList();
		this.search = name;
		this.courseService.loadList('0', name);
	}

	public loadMore() {
		this.loaderService.show();
		this.courseService.loadList((this.loadMoreCounter * this.courseService.limit).toString(), this.search);
		this.loadMoreCounter += 1;
	}

	private subscribeCoursesList() {
		console.log('subscribe course list');
		this.loaderService.show();
		let sub = this.courseService.getList()
			.subscribe(
				(resp) => {
					this.courses = this.courses.concat(resp);
					// this.coursesClone = this.courses.slice();

					this.isCourseListFull = this.courses.length < (this.loadMoreCounter * this.courseService.limit);
					this.loaderService.hide();
					this.ref.markForCheck();
				},
				(error) => {
					console.error('error', error);
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

	private loadCourses() {
		console.log('loadCourses');
		this.courseService.loadList();
	}

	private resetCourseList() {
		this.courses = [];
		this.loadMoreCounter = 1;
	}
}
