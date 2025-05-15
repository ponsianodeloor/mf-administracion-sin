import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  data: any;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: any;
}

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export class TreeViewComponent {
  @Input() set data(value: TreeNode[]) {
    if (!Array.isArray(value)) {
      value = [];
    }
    this._data = value;
    this.dataSource.data = value;
  }
  get data(): TreeNode[] {
    return this._data;
  }
  @Output() selectedNode = new EventEmitter<TreeNode>();

  private _data: TreeNode[] = [];
  selectedNodeData: any = null;

  private _transformer = (node: TreeNode, level: number): FlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.data.nombre || '',
      level: level,
      data: node.data
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onNodeClick(node: any) {
    if (node) {
      this.selectedNodeData = node;
      this.selectedNode.emit(node);
    }
  }

  isNodeSelected(node: any): boolean {
    return this.selectedNodeData === node;
  }
}
