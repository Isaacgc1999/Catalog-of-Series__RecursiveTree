import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieTreeComponent } from './movie-tree.component';
import { MovieTreeNodeComponent } from '../movie-tree-node/movie-tree-node.component';
import { FormsModule } from '@angular/forms';
import { FilterCatalogueService } from '../../services/filter-catalogue/filter-catalogue.service';
import { NodeAdministrationService } from '../../services/node-administration/node-administration.service';
import { of } from 'rxjs';
import { NodeTree } from '../../models/movies.model';

class MockFilterCatalogueService {
  filterTree(nodes: NodeTree[], query: string): NodeTree[] {
    return nodes.filter(node => node.nodeName.includes(query));
  }
}

class MockNodeAdministrationService {
  createTree(nodes: NodeTree[]): NodeTree[] {
    return nodes;
  }
  deleteNodeRecursive(nodes: NodeTree[], id: number): NodeTree[] {
    return nodes.filter(node => node.id !== id);
  }
  addNode(nodes: NodeTree[], newNodeName: string): void {
    nodes.push({ id: Date.now(), nodeName: newNodeName, icon: 'default', level: 0 });
  }
}

describe('MovieTreeComponent', () => {
  let component: MovieTreeComponent;
  let fixture: ComponentFixture<MovieTreeComponent>;
  let filterCatalogueService: FilterCatalogueService;
  let nodeAdministrationService: NodeAdministrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MovieTreeComponent, MovieTreeNodeComponent],
      providers: [
        { provide: FilterCatalogueService, useClass: MockFilterCatalogueService },
        { provide: NodeAdministrationService, useClass: MockNodeAdministrationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieTreeComponent);
    component = fixture.componentInstance;
    filterCatalogueService = TestBed.inject(FilterCatalogueService);
    nodeAdministrationService = TestBed.inject(NodeAdministrationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('it should filter the node correctly', () => {
    component.moviesWithTree = [
      { id: 1, nodeName: 'Movie 1', icon: 'icon1', level: 0 },
      { id: 2, nodeName: 'Another Movie', icon: 'icon2', level: 0 }
    ];
    component.searchQuery = 'Movie';
    const filtered = component.filterCatalogue;
    expect(filtered.length).toBe(2);
    expect(filtered[0].nodeName).toBe('Movie 1');
  });

  it('it should add a new node', () => {
    const initialLength = component.moviesWithTree.length;
    component.addNode('New Movie', component.moviesWithTree);
    expect(component.moviesWithTree.length).toBe(initialLength + 1);
    expect(component.moviesWithTree[component.moviesWithTree.length - 1].nodeName).toBe('New Movie');
  });

  it('it should delete an existing node', () => {
    const nodeToDelete = { id: 1, nodeName: 'Movie 1', icon: 'icon1', level: 0 };
    component.moviesWithTree = [nodeToDelete, { id: 2, nodeName: 'Another Movie', icon: 'icon2', level: 0 }];
    component.removeNode(nodeToDelete);
    expect(component.moviesWithTree.length).toBe(1);
    expect(component.moviesWithTree.find(node => node.id === nodeToDelete.id)).toBeUndefined();
  });
});
