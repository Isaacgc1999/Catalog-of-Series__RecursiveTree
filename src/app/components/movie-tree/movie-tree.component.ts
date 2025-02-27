import { Component, inject, OnInit } from '@angular/core';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { MOVIES} from '../../mocks/movies.mock';
import { SEASONS} from '../../mocks/seasons.mock';
import { EPISODES } from '../../mocks/episodes.mock';
import { CommonModule } from '@angular/common';
import { NodeTree } from '../../models/movies.model';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterCatalogueService } from '../../services/filter-catalogue.service';
import { VERSIONS } from '../../mocks/products.mock';

@Component({
  selector: 'app-movie-tree',
  imports: [CommonModule, MovieTreeNodeComponent, FormsModule],
  templateUrl: './movie-tree.component.html',
  styleUrl: './movie-tree.component.scss',
  standalone: true
})

export class MovieTreeComponent {
  searchQuery: string = '';
  moviesWithTree: NodeTree[] = [];
  newNodeName: string = '';

  readonly filterCatalogueService = inject(FilterCatalogueService);

  constructor() {
    this.createTree();
  }

  createTree(): void{
    this.moviesWithTree = MOVIES.map(movie => ({
      ...movie,
      node: SEASONS.filter(season => season.parentId === movie.id)
        .map(season => ({
          ...season,
          node: EPISODES.filter(episode => episode.parentId === season.id).map(episode => ({
            ...episode,
            node: VERSIONS.filter(version => version.parentId === episode.id)
          }))
        }))
    }));
  }

  OnShowChild(id: number): void{
    const movieId = this.moviesWithTree.find((m :NodeTree)=> m.id === id);
    if(movieId){
      movieId.expanded = !movieId.expanded;
    }
  }

  get filterCatalogue(): NodeTree[] {
    return this.filterCatalogueService.filterTree(this.moviesWithTree, this.searchQuery);
  }

  // removeNode(nodes: NodeTree[], nodeToRemove: NodeTree): NodeTree[] {
  //   return this.moviesWithTree.reduce((acc: NodeTree[], node: NodeTree) => {
  //   if (node.id === nodeToRemove.id && node.parentId === nodeToRemove.parentId) {
  //     return acc;
  //   }
  //   if (node.node) {
  //     node.node = this.removeNode(node.node, nodeToRemove);
  //   }
  //   acc.push(node);
  //   return acc;
  // }, []);
  // }

  removeNode(nodeToDelete: NodeTree): void {
    // Se inicia la búsqueda en el nivel raíz, donde currentParentId es igual al event.parentId (undefined para nodos raíz)
    this.moviesWithTree = this.deleteNodeRecursive(this.moviesWithTree, nodeToDelete.id, nodeToDelete.parentId);
  }

  private deleteNodeRecursive(
    nodes: NodeTree[],
    targetId: number,
    currentParentId: number | undefined
  ): NodeTree[] {
    return nodes.reduce((actual: NodeTree[], node) => {
      // Si este nodo es el que queremos eliminar y su parentId coincide con el del nivel actual, se omite.
      if (node.id === targetId && node.parentId === currentParentId && node.parentId !== undefined) {
        return actual;
      }
      // Procesa recursivamente los hijos, pasando el id del nodo actual como currentParentId para el siguiente nivel.
      const updatedChildren = node.node
        ? this.deleteNodeRecursive(node.node, targetId, node.id)
        : [];
        actual.push({ ...node, node: updatedChildren });
      return actual;
    }, []);
  }

  addNode(newNodename: string): void{
      this.moviesWithTree.push({
        id: this.moviesWithTree.length + 1,
        nodeName: newNodename,
        node: [],
        icon: this.moviesWithTree[0].icon,
        expanded: false
    });
    }
}
