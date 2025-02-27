import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NodeTree } from '../../models/movies.model';
import { MatIconModule } from '@angular/material/icon';
import { Quotes } from '../../mocks/random-quote.mock';
import { Quote } from '../../models/quotes.model';

@Component({
  selector: 'app-movie-tree-dialog',
  imports: [MatIconModule],
  templateUrl: './movie-tree-dialog.component.html',
  styleUrl: './movie-tree-dialog.component.scss',
  standalone: true
})
export class MovieTreeDialogComponent implements OnInit{
  readonly data = inject<NodeTree>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
  randomImage: string = '';
  randomId = Math.random();
  randomQuote?: Quote;

  ngOnInit(): void {
    this.getRandomQuote();
  }

  getRandomQuote(): void {
    this.randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)];
  }

  closeDialog(): void{
    this.dialog.closeAll();
  }
}
