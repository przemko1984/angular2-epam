import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICourse } from '../../business-entities/';

@Injectable()
export class CourseService {

    constructor() { }

    getList(): ICourse[] {
        return [{
            id: 'uuid1',
            name: 'Course 1',
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 'uuid2',
            name: 'Course 2',
            duration: 15,
            createDate: new Date('2016-12-10'),
            description: 'Lorem ipsum dolor sit amet 2, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. .'
        }, {
            id: 'uuid3',
            name: 'Course 3',
            duration: 20,
            createDate: new Date('2017-01-10'),
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }];
    }

    create(course: ICourse): ICourse {
        return {
            id: 'uuid4',
            name: 'Course 4',
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        };
    }

    getById(id: string): ICourse {
        return {
            id: 'uuid1',
            name: 'Course 1',
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        };
    }

    update(id: string, updateCours: ICourse): ICourse {
        return {
            id: 'uuid1',
            name: 'Course 1',
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        };
    }

    remove(id: string) {

    }

}
