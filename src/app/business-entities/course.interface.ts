export interface INewCourse {
    name: string;
    date: Date;
    duration: number;
    description?: string;
}

export interface ICourse extends INewCourse {
    id: string;
    topRated: boolean;
}
