import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NodeTree } from '../../models/movies.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MovieTreeDialogComponent } from '../movie-tree-dialog/movie-tree-dialog.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-tree-node',
  imports: [CommonModule,
    MatIconModule,
    MovieTreeNodeComponent,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './movie-tree-node.component.html',
  styleUrl: './movie-tree-node.component.scss',
  standalone: true
})
export class MovieTreeNodeComponent {
  @Input() data!: NodeTree;
  @Output() removeNode = new EventEmitter<NodeTree>();
  isExpanded: boolean = false;
  newNodeName: string = '';
  readonly dialog = inject(MatDialog);

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  openNodeDetails(): void{
    const dialogRef = this.dialog.open(MovieTreeDialogComponent, {
      data: this.data,
      height: '300px',
      width: '450px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
    });
  }

  addNode(newNodename: string): void{
    if(this.data?.node){
      console.log(this.data?.node?.length + 1);

      this.data?.node?.push({
        id: this.data.node.length + 1,
        nodeName: newNodename,
        node: [],
        icon: this.data.icon,
        expanded: false
    });
    }
  }

  deleteNode(): void {
    console.log("ha llegado al hijo");
    this.removeNode.emit(this.data);
  }

  onChildRemove(child: NodeTree): void {
    this.data.node = this.data?.node?.filter(n => n.id !== child.id);
    this.removeNode.emit(child);
  }
}
