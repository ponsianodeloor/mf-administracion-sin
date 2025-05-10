import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion-catalogo',
  templateUrl: './administracion-catalogo.component.html',
  styleUrl: './administracion-catalogo.component.scss'
})
export class AdministracionCatalogoComponent implements OnInit, OnDestroy {
  
  treeData: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataDemoTree();
  }

  ngOnDestroy(): void {}

  onSelectedNode(node: any) {
    console.log(node);
    this.router.navigate([node.form]);
  }

  dataDemoTree() {
    this.treeData = [
      {
        data: { name: 'Categoría 1', form: 'administracion-sin/actos-notariales/administracion/categoria' },
        children: [
          {
            data: { name: 'Subcategoría 1.1', form: 'administracion-sin/actos-notariales/administracion/subcategoria' },
            children: [
              { data: { name: 'Subsubcategoría 1.1.1', form: 'administracion-sin/actos-notariales/administracion/documento' } },
              { data: { name: 'Subsubcategoría 1.1.2', form: 'administracion-sin/actos-notariales/administracion/documento' } },
            ]
          },
          {
            data: { name: 'Subcategoría 1.2', form: 'administracion-sin/actos-notariales/administracion/subcategoria' },
            children: [
              { data: { name: 'Subsubcategoría 1.2.1', form: 'administracion-sin/actos-notariales/administracion/documento' } },
            ]
          }
        ]
      },
      {
        data: { name: 'Categoría 2', form: 'administracion-sin/actos-notariales/administracion/categoria' },
        children: [
          { data: { name: 'Subcategoría 2.1', form: 'administracion-sin/actos-notariales/administracion/subcategoria' } },
        ]
      }
    ]
  }
}
