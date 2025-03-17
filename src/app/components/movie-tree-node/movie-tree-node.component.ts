import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NodeTree } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MovieTreeDialogComponent } from '../movie-tree-dialog/movie-tree-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NodeAdministrationService } from '../../services/node-administration/node-administration.service';
import { ShowIfIsNotExampleDirective } from '../../directives/show-if-is-not-example.directive';

@Component({
  selector: 'app-movie-tree-node',
  imports: [CommonModule,
    MatIconModule,
    MovieTreeNodeComponent,
    ReactiveFormsModule,
    FormsModule,
    ShowIfIsNotExampleDirective],
  templateUrl: './movie-tree-node.component.html',
  styleUrl: './movie-tree-node.component.scss',
  standalone: true
})
export class MovieTreeNodeComponent {
  @Input() data!: NodeTree;
  @Input() completeNode!: NodeTree[];
  @Input() isExample: boolean = false;
  @Output() removeNode = new EventEmitter<NodeTree>();
  isExpanded: boolean = false;
  newNodeName: string = '';
  readonly dialog = inject(MatDialog);
  readonly nodeAdministrationService = inject(NodeAdministrationService);

  toggleExpand() {
    console.log("this.data.isExpanded ", this.data.isExpanded);
    console.log("this.data.node ", this.data.node);
    console.log("this.data.node.length > 0: ", this.data.node?.length);

    if (!this.data.isExpanded && this.data.node && this.data.node.length > 0) {
      console.log(this.data); 
      // this.isExpanded = !this.isExpanded;
      this.data.isExpanded = !this.isExpanded;
    }
  }

  openNodeDetails(): void{
    const dialogRef = this.dialog.open(MovieTreeDialogComponent, {
      data: this.data,
      height: '300px',
      width: '450px',
      panelClass: 'custom-dialog-container',
      disableClose: true,  
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    });
  }

  addNode(newNodename: string): void{
    this.nodeAdministrationService.addChildNode(this.data, newNodename, this.completeNode);
  }

  deleteNode(): void {
    console.log(this.data);
    this.removeNode.emit(this.data);
  }

  onChildRemove(child: NodeTree): void {
    console.log(this.data);
    this.data.node = this.data?.node?.filter(n => n.id !== child.id);
    this.removeNode.emit(child);
  }
}
