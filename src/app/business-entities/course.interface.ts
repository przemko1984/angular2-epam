export interface IAuthor {
    id: number;
    firstName: string;
    lastName: string;
}

export interface INewCourse {
    name: string;
    date: Date;
    length: number;
    description?: string;
    authors?: IAuthor[];
}

export interface ICourse extends INewCourse {
    id: number;
    isTopRated: boolean;
}