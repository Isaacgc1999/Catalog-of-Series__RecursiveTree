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

  removeNode(node: NodeTree): void {
    console.log("ha llegado al padre");
    const nodeToDelete = this.moviesWithTree.find((n: NodeTree) => n.id === node.id);
    if (nodeToDelete) {
      this.moviesWithTree = this.moviesWithTree.filter((n: NodeTree) => n.id !== node.id);
      console.log(nodeToDelete);
    }
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
