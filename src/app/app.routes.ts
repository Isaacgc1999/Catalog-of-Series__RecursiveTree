import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieTreeComponent } from './components/movie-tree/movie-tree.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
        { path: 'movie-tree', component: MovieTreeComponent },
    ],
    },
];
