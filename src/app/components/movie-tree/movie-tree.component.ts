import { Component, inject, OnInit } from '@angular/core';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { CommonModule } from '@angular/common';
import { NodeTree } from '../../models/movies.model';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterCatalogueService } from '../../services/filter-catalogue/filter-catalogue.service';
import { NodeAdministrationService } from '../../services/node-administration/node-administration.service';

@Component({
  selector: 'app-movie-tree',
  imports: [CommonModule, MovieTreeNodeComponent, FormsModule],
  templateUrl: './movie-tree.component.html',
  styleUrl: './movie-tree.component.scss',
  standalone: true
})

export class MovieTreeComponent {
  searchQuery: string = '';
  searchQuery2: string = '';
  moviesWithTree: NodeTree[] = [];
  moviesWithTree2: NodeTree[] = [];
  newNodeName: string = '';
  newNodeName2: string = '';

  readonly filterCatalogueService = inject(FilterCatalogueService);
  readonly nodeAdministrationService = inject(NodeAdministrationService);

  constructor() {
    this.moviesWithTree = this.nodeAdministrationService.createTree(this.moviesWithTree);
    }

  get filterCatalogue(): NodeTree[] {
    return this.filterCatalogueService.filterTree(this.moviesWithTree, this.searchQuery);
  }
  get filterCustomCatalogue(): NodeTree[] {
    return this.filterCatalogueService.filterTree(this.moviesWithTree2, this.searchQuery2);
  }

  removeNode(nodeToDelete: NodeTree): void {
    this.moviesWithTree = this.nodeAdministrationService.deleteNodeRecursive(this.moviesWithTree, nodeToDelete.id, nodeToDelete.parentId);
  }

  addNode(newNodename: string, node: NodeTree[]): void {
    this.nodeAdministrationService.addNode(node, newNodename);
  } 
}
