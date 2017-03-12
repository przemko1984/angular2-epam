import { IVideo } from './video.interface';

export interface ICourse {
    id: string;
    name: string;
    video: IVideo;
    createData: Date;
    modificationData: Date;
    description?: string;
}

