export interface VideoDTO {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  duration: number;
  url?: string;
}

export interface Video
  extends Omit<VideoDTO, 'createdAt' | 'deletedAt' | 'updatedAt'> {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface VideosDTO {
  [id: string]: VideoDTO;
}

export interface Videos {
  [id: string]: Video;
}

export interface ExportVideoDTO {
  id: string;
  video: VideoDTO;
  isNewRegularUser: boolean;
}

export const deserializeVideoDTO = (video: VideoDTO): Video => ({
  ...video,
  createdAt: new Date(video.createdAt),
  updatedAt: video.updatedAt ? new Date(video.updatedAt) : undefined,
  deletedAt: video.deletedAt ? new Date(video.deletedAt) : undefined,
});

export const deserializeVideosDTO = (videos: VideosDTO): Videos =>
  Object.entries(videos).reduce<Videos>((res, [id, video]) => {
    res[id] = deserializeVideoDTO(video);
    return res;
  }, {});
