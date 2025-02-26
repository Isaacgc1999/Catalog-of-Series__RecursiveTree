import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeTree } from '../../models/movies.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-tree-dialog',
  imports: [MatIconModule],
  templateUrl: './movie-tree-dialog.component.html',
  styleUrl: './movie-tree-dialog.component.scss',
  standalone: true
})
export class MovieTreeDialogComponent {
  readonly data = inject<NodeTree>(MAT_DIALOG_DATA);
}
