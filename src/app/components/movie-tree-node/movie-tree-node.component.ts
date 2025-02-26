import { Component, Input, OnInit } from '@angular/core';
import { NodeTree } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-tree-node',
  imports: [CommonModule, MatIconModule, MovieTreeNodeComponent],
  templateUrl: './movie-tree-node.component.html',
  styleUrl: './movie-tree-node.component.scss',
  standalone: true
})
export class MovieTreeNodeComponent {
  @Input() data!: NodeTree;
  season?: NodeTree;
  episode?: NodeTree;
  movie?: NodeTree;
  isExpanded: boolean = false;
  noData: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
