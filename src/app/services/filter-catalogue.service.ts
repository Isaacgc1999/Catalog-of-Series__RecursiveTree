import { Injectable } from '@angular/core';
import { NodeTree } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class FilterCatalogueService {

  constructor() { }

  // private filterEpisodes(episodes: Episode[], query: string): Episode[] {
  //   return episodes.filter(({ episodeName }) =>
  //     episodeName.toLowerCase().includes(query)
  //   );
  // }
  
  // private filterSeasons(seasons: Season[], query: string): Season[] {
  //   return seasons
  //     .map(season => {
  //       const filteredEpisodes = this.filterEpisodes(season.episodes || [], query);
  //       return { ...season, episodes: filteredEpisodes };
  //     })
  //     .filter(season =>
  //       season.seasonName.toLowerCase().includes(query) || season.episodes.length > 0
  //     );
  // }
  
  // get filteredMovies(): Movie[] {
  //   if (!this.searchQuery.trim()) return this.movies;
  //   const query = this.searchQuery.toLowerCase();
  
  //   return this.movies
  //     .map(movie => {
  //       const filteredSeasons = this.filterSeasons(movie.seasons || [], query);
  //       return { ...movie, seasons: filteredSeasons };
  //     })
  //     .filter(movie =>
  //       movie.movieName.toLowerCase().includes(query) || movie.seasons.length > 0
  //     );
  // }
  public filterTree(nodes: NodeTree[], searchQuery: string): NodeTree[] {
    if(!searchQuery.trim()){
      return nodes;
    }
    const queryToLower = searchQuery.toLowerCase();
  
    return nodes.reduce((filtered: NodeTree[], node) => {
      // Filtra recursivamente los hijos si existen.
      const filteredChildren = node.node ? this.filterTree(node.node, queryToLower) : [];
      // Si el nodo coincide o tiene hijos que coinciden, se incluye.
      if (node.nodeName.toLowerCase().includes(queryToLower) || filteredChildren.length > 0) {
        filtered.push({ ...node, node: filteredChildren });
      }
      return filtered;
    }, []);
  }
}
