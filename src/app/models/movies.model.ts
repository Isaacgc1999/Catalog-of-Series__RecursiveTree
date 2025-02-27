export interface NodeTree {
    id: number;
    nodeName: string;
    icon: string;
    parentId?: number;
    node?: NodeTree[];
}

export enum IconLevel {
    MOVIE = 'tv',
    SEASON = 'auto_stories',
    EPISODE = 'assignment_returned',
}
