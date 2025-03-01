import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieTreeNodeComponent } from './movie-tree-node.component';
import { NodeAdministrationService } from '../../services/node-administration/node-administration.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MovieTreeDialogComponent } from '../movie-tree-dialog/movie-tree-dialog.component';
import { NodeTree } from '../../models/movies.model';

describe('MovieTreeNodeComponent', () => {
  let component: MovieTreeNodeComponent;
  let fixture: ComponentFixture<MovieTreeNodeComponent>;
  let mockNodeAdminService: jasmine.SpyObj<NodeAdministrationService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockNodeAdminService = jasmine.createSpyObj('NodeAdministrationService', ['addChildNode', 'deleteNodeRecursive']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [MovieTreeNodeComponent],
      providers: [
        { provide: NodeAdministrationService, useValue: mockNodeAdminService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieTreeNodeComponent);
    component = fixture.componentInstance;
  });

  it('should toggle isExpanded property', () => {
    expect(component.isExpanded).toBeFalse();
    component.toggleExpand();
    expect(component.isExpanded).toBeTrue();
    component.toggleExpand();
    expect(component.isExpanded).toBeFalse();
  });

  it('should open node details dialog', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
    mockDialog.open.and.returnValue(dialogRefSpyObj);
  
    component.openNodeDetails();
  
    expect(mockDialog.open).toHaveBeenCalledWith(MovieTreeDialogComponent, {
      data: component.data,
      height: '300px',
      width: '450px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      autoFocus: false,
    });
  });

  it('should add a new node', () => {
    const newNodeName = 'New Node';
    const completeNode: NodeTree[] = [
      { id: 1, nodeName: 'Node 1', icon: 'icon1', level: 0 },
      { id: 2, nodeName: 'Node 2', icon: 'icon1', level: 0 }
    ];

    const initialNodeCount = completeNode.length;
  
    component.addNode(newNodeName);
  
    expect(mockNodeAdminService.addChildNode).toHaveBeenCalledWith(component.data, newNodeName, component.completeNode);
    if(component.completeNode){
      expect(completeNode.length).toBeGreaterThan(initialNodeCount);
    }
  });
});
