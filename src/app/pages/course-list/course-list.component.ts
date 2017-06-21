import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';
// ngrx
import { Store } from '@ngrx/store';
import { INIT_COURSES, ICoursesReducer, IAppStore } from '../../reducers';

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
	private loadMoreCounter: number = 1;
	private noMoreResults: Observable<boolean>;
	// private resetListOnLoad: boolean = false;
	private search: string;

	constructor(
		private ref: ChangeDetectorRef,
		private courseService: CourseService,
		private loaderService: LoaderService,
		private filterByName: FilterByNamePipe,
		private store: Store<IAppStore>
	) {
		super();
		console.log('CourseListPageComponent: constructor');
	}

	onInit() {
		console.log('CourseListPageComponent: ngOnInit');
		this.subscribeCoursesList();
		this.loadCourses();
		this.noMoreResults = this.courseService.noMoreResults$;
		this.store.dispatch({type: INIT_COURSES});
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
				// this.resetCourseList();
				this.loadCourses(this.courses.length);
			},
			(error) => {
				this.loaderService.hide();
				console.error('error', error);
			}
		);
		this.registerSubscription(sub);
	}

	public searchCourse(name: string) {
		// this.courses = this.filterByName.transform(this.coursesClone, name);
		this.loaderService.show();
		// this.resetCourseList();
		this.loadMoreCounter = 1;
		this.search = name;
		// this.courseService.loadList(0, name);
		this.courseService.search(name);
	}

	public loadMore() {
		this.loaderService.show();
		this.courseService.loadList((this.loadMoreCounter * this.courseService.limit), this.search);
		this.loadMoreCounter += 1;
	}

	private subscribeCoursesList() {
		console.log('subscribe course list');
		this.loaderService.show();
		let sub = this.courseService.getList()
			.subscribe(
				(resp) => {
					this.courses = resp;
					// this.courses = this.resetListOnLoad ? resp : this.courses.concat(resp);
					// this.resetListOnLoad = false;
					// this.isCourseListFull = this.courses.length < (this.loadMoreCounter * this.courseService.limit);
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

	private loadCourses(limit?: number) {
		console.log('loadCourses');
		this.courseService.loadList(0, this.search, limit);
	}

	// private resetCourseList() {
	// 	this.resetListOnLoad = true;
	// }

}
