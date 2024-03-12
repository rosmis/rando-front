export interface HikeImage {
    id: number;
    image_url: string;
}

export interface HikePreview {
    id: number;
    title: string;
    excerpt: string;
    activity_type: string;
    latitude: number;
    longitude: number;
    difficulty: string;
    distance: number;
    duration: number;
    images: HikeImage[];
}

export interface Hike {
    id: number;
    title: string;
    excerpt: string;
    description: string;
    activity_type: string;
    difficulty: string;
    distance: number;
    duration: number;
    positive_elevation: number;
    negative_elevation: number;
    municipality: string;
    highest_point: number;
    lowest_point: number;
    latitude: number;
    longitude: number;
    ign_reference: string;
    hike_url: string;
    gpx_url: string;
    is_return_starting_point: boolean;
    images: HikeImage[];
}
