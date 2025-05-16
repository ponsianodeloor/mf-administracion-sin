import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCatalogoService } from '../../../../shared/services/admin-catalogo.service';
import { NodeSelectionService } from '../../services/node-selection.service';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';

interface TreeNode {
  data: {
    id: number;
    nombre: string;
    nemonico: string;
    level?: number;
    [key: string]: any;
  };
  children?: TreeNode[];
}

@Component({
  selector: 'app-administracion-catalogo',
  templateUrl: './administracion-catalogo.component.html',
  styleUrl: './administracion-catalogo.component.scss',
})
export class AdministracionCatalogoComponent implements OnInit, OnDestroy {
  private nemonico = environment.AdministracionCatalogonemonicoPadre;
  private saveSubscription: Subscription;

  treeData!: TreeNode;
  nodeSelected: any;

  constructor(
    private router: Router,
    private adminCatalogoService: AdminCatalogoService,
    private nodeSelectionService: NodeSelectionService
  ) {
    this.saveSubscription = this.nodeSelectionService.saveEvent$.subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }

  ngOnInit(): void {
    if (!this.nodeSelected) {
      this.router.navigate([
        '/administracion-sin/actos-notariales/administracion',
      ]);
    }
    this.dataTree();
  }

  ngOnDestroy(): void {
    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
  }

  onSelectedNode(node: any) {
    this.nodeSelectionService.setSelectedNode(node);
    switch (node.treeLevel) {
      case 1:
        this.router.navigate([
          '/administracion-sin/actos-notariales/administracion/categoria',
        ]);
        this.nodeSelected = node;
        break;
      case 2:
        this.router.navigate([
          '/administracion-sin/actos-notariales/administracion/subcategoria',
        ]);
        this.nodeSelected = node;
        break;
      case 3:
        this.router.navigate([
          '/administracion-sin/actos-notariales/administracion/documento',
        ]);
        this.nodeSelected = node;
        break;
      default:
        console.warn('Node or form property is missing:', node);
    }
  }

  initialFormLevel() {
    const assignLevels = (node: TreeNode, level: number = 0) => {
      if (node.data) {
        node.data = {
          ...node.data,
          treeLevel: level,
        };

        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            assignLevels(child, level + 1);
          });
        }
      }
    };

    if (this.treeData) {
      assignLevels(this.treeData);
    }
  }

  dataTree() {
    this.adminCatalogoService
      .getPesnotCatCatalogoByNemonicoTree(this.nemonico)
      .subscribe({
        next: (res: any) => {
          this.treeData = Array.isArray(res) ? res[0] : res;
          this.initialFormLevel();
        },
        error: (err: any) => {
          this.treeData = {} as TreeNode;
        },
      });
  }
}
