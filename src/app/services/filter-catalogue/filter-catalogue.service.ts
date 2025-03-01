import { Injectable } from '@angular/core';
import { NodeTree } from '../../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class FilterCatalogueService {

  constructor() { }

  public filterTree(nodes: NodeTree[], searchQuery: string): NodeTree[] {
    if(!searchQuery.trim()){
      return nodes;
    }
    const queryToLower = searchQuery.toLowerCase();
  
    return nodes.reduce((filtered: NodeTree[], node) => {
      const filteredChildren = node.node ? this.filterTree(node.node, queryToLower) : [];
      if (node.nodeName.toLowerCase().includes(queryToLower) || filteredChildren.length > 0) {
        filtered.push({ ...node, node: filteredChildren });
      }
      return filtered;
    }, []);
  }
}
