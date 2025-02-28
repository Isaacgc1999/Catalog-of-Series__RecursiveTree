export interface NodeTree {
    id: number;
    nodeName: string;
    icon: string;
    parentId?: number;
    level: number;
    node?: NodeTree[];
}

export const IconLevel: { [key: number]: string } = {
    0: 'tv',
    1: 'auto_stories', 
    2: 'assignment_return', 
};
