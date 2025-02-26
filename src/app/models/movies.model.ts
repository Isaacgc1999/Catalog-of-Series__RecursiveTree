export interface NodeTree {
    id: number;
    nodeName: string;
    icon: string;
    parentId?: number;
    node?: NodeTree[];
    expanded: boolean;
}
