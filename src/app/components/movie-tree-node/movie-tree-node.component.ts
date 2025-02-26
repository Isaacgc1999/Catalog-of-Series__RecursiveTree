import { Component, inject, Input, OnInit } from '@angular/core';
import { NodeTree } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MovieTreeDialogComponent } from '../movie-tree-dialog/movie-tree-dialog.component';

@Component({
  selector: 'app-movie-tree-node',
  imports: [CommonModule, MatIconModule, MovieTreeNodeComponent],
  templateUrl: './movie-tree-node.component.html',
  styleUrl: './movie-tree-node.component.scss',
  standalone: true
})
export class MovieTreeNodeComponent {
  @Input() data!: NodeTree;
  isExpanded: boolean = false;
  readonly dialog = inject(MatDialog);

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  openNodeDetails(): void{
    const dialogRef = this.dialog.open(MovieTreeDialogComponent, {
      data: this.data,
      height: '300px',
      width: '450px',
    });
  }
}
