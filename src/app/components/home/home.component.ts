import { Component } from '@angular/core';
import { MovieTreeComponent } from "../movie-tree/movie-tree.component";
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
  selector: 'app-home',
  imports: [MovieTreeComponent, TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
}
