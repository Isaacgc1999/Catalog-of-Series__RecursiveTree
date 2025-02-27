import { Injectable } from '@angular/core';
import { NodeTree } from '../../models/movies.model';
import { MOVIES } from '../../mocks/movies.mock';
import { SEASONS } from '../../mocks/seasons.mock';
import { EPISODES } from '../../mocks/episodes.mock';

@Injectable({
  providedIn: 'root'
})
export class NodeAdministrationService {

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
      targetId: number,
      currentParentId: number | undefined
    ): NodeTree[] {
      return nodes
    .map((node) => {
      // Si el nodo es el que queremos eliminar y pertenece al padre correcto, lo excluimos
      if (node.id === targetId && node.parentId === currentParentId) {
        return null;
      }
      // Si tiene hijos, aplicamos la recursión, pero si no, conservamos la referencia
      const updatedChildren = node.node
        ? this.deleteNodeRecursive(node.node, targetId, node.id)
        : node.node; // <-- Mantenemos undefined si no tenía hijos
      return { ...node, node: updatedChildren };
    })
    .filter(Boolean) as NodeTree[];
    }

    addNode(node: NodeTree[], newNodename: string): void{
      node.push({
        id: node.length + 1,
        nodeName: newNodename,
        node: [],
        icon: 'new_releases'
    });
    }

    countAllNodes(node: NodeTree[]): number {
      if (!node || !Array.isArray(node)) {
        return 0; // Retorna 0 si el nodo es inválido
      }
      let count = 0;
      node.forEach(node => {
        // Cuenta el nodo actual.
        count++;
        // Si tiene hijos, los recorre recursivamente y suma su cantidad.
        if (node.node && node.node.length > 0) {
          count += this.countAllNodes(node.node);
        }
      });
      return count;
    }
    

    addChildNode(data: NodeTree, newNodename: string, completeNode: NodeTree[]): void{
      let count = this.countAllNodes(completeNode);
      if(data?.node){
        
        data?.node?.push({
          id: count + 1,
          nodeName: newNodename,
          node: [],
          icon: data.icon
      });
      }
    }
}
