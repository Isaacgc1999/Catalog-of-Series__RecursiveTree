import { Injectable } from '@angular/core';
import { IconLevel, NodeTree } from '../../models/movies.model';
import { MOVIES } from '../../mocks/movies.mock';
import { SEASONS } from '../../mocks/seasons.mock';
import { EPISODES } from '../../mocks/episodes.mock';

@Injectable({
  providedIn: 'root'
})
export class NodeAdministrationService {

  uniqueIndex: number = 0;
  constructor() { }

  createTree(node: NodeTree[]): NodeTree[]{
    return node = MOVIES.map(movie => ({
        ...movie,
        node: SEASONS.filter(season => season.parentId === movie.id)
          .map(season => ({
            ...season,
            node: EPISODES.filter(episode => episode.parentId === season.id)
          }))
      }));
    }
    
    deleteNodeRecursive(
      nodes: NodeTree[], 
      targetId: number
    ): NodeTree[] {
      return nodes
        .filter(node => node.id !== targetId)
        .map(node => ({
          ...node,
          node: this.deleteNodeRecursive(node.node ?? [], targetId)
      }));
    }

    addNode(node: NodeTree[], newNodename: string): void{
      node.push({
        id: this.uniqueIndex++,
        nodeName: newNodename,
        node: [],
        icon: IconLevel[0],
        level: this.assignLevels(node)
    });
    }

    addChildNode(data: NodeTree, newNodename: string, completeNode: NodeTree[]): void{
      if(data?.node){
        
        data?.node?.push({
          id: this.uniqueIndex++,
          nodeName: newNodename,
          node: [],
          icon: IconLevel[data.level + 1],
          level: data.level + 1
      });
      }
    }

    //PRIVATE METHODS
    private assignLevels(nodes: NodeTree[], currentLevel: number = 0): number {
      nodes.forEach(node => {
        node.level = currentLevel;
        if (node.node && node.node.length > 0) {
          this.assignLevels(node.node, currentLevel + 1);
        }
      });
      return currentLevel;
    }
}
