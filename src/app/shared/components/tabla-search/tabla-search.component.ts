import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableSearchPaginated, FilterOption, ColumnDefinition } from './table';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tabla-search.component.html',
  styleUrls: ['./tabla-search.component.scss'],
})
export class TablaSearchComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() eventUpdated = new EventEmitter<void>();
  @Input() data: any[] = [];
  @Input() noPaginated: boolean = false;
  public activeColumn: string | null = null;
  @Input() acciones: string[] = ['editar', 'eliminar'];
  @Input() displayedColumns: ColumnDefinition[] = [];
  displayedColumnNames: string[] = []; // Used for MatTable
  @Input() filterableColumns: string[] = [];
  selectedFilters: { [key: string]: string } = {};
  @Input() sortBy: string = 'id';
  @Input() sortDirection: string = 'desc';
  @Output() pageChange = new EventEmitter<TableSearchPaginated>();
  @Output() openRegistroDialog = new EventEmitter<any>();
  @Output() selectRow = new EventEmitter<{ row: any, action: 'edit' | 'download' }>();
  @Output() delete = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<TableSearchPaginated>();
  searchQuery: string = '';
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  acciones_button: boolean = false;
  userSelected!: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() filterChanged = new EventEmitter<{
    column: string;
    value: string;
  }>();
  @Output() consultarEvent = new EventEmitter<any>();
  @Output() download = new EventEmitter<any>();
  activeFilterOptions: { [key: string]: string | number } = {};

  // Reemplazar los inputs individuales por un objeto de configuración
  @Input() tableParams: TableSearchPaginated = {
    page: 1,
    pageSize: 10,
    searchQuery: {},
    sortBy: 'id',
    sortDirection: 'asc',
    filterOptions: [],
    filterTableColumns: [],
    totalElements: 0,
    pageIndex: 0,
    from: 0,
    to: 0
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private paginatorIntl: MatPaginatorIntl,
  ) {}

  configurePaginatorLabels() {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = () => {
      const startIndex = this.tableParams.from || 0;
      const endIndex = this.tableParams.to || 0;
      return `${startIndex} - ${endIndex} de ${this.tableParams.totalElements}`;
    };
    this.paginatorIntl.changes.next();
  }


  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.configurePaginatorLabels();
    this.displayedColumnNames = this.displayedColumns.map(col => col.name);

    if (this.acciones.includes('eliminar') || this.acciones.includes('editar')) {
      this.acciones_button = true;
    }
    this.initializeFilters();
  }

  initializeFilters() {
    this.tableParams.filterOptions.forEach(
      (option) => {
        this.selectedFilters[option.key] = '';
      }
    );
  }

  applyFilters() {
    this.applyAllFilters();
    this.filterChanged.emit({ column: this.activeColumn, value: this.selectedFilters[this.activeColumn] });
  }


  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
    if (changes['displayedColumns']) {
      this.displayedColumnNames = this.displayedColumns.map(col => col.name);
    }
    if (changes['tableParams']) {
      this.updatePaginator();
    }
  }

  updatePaginator() {
    if (this.paginator) {
      // Asegurarse de que los valores sean números válidos
      this.paginator.length = this.tableParams.totalElements || 0;
      this.paginator.pageIndex = Math.max(0, this.tableParams.pageIndex);
      this.paginator.pageSize = Math.max(1, this.tableParams.pageSize);

      // Forzar la actualización de la vista
      this.cdr.detectChanges();
    }
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.trim();
  }

  onSearch(): void {
    this.onSearchQueryEvent();
  }

  onPageChange(event: any): void {
    // Validar que los valores sean correctos
    const pageIndex = Math.max(0, event.pageIndex);
    const pageSize = Math.max(1, event.pageSize);

    const updatedParams: TableSearchPaginated = {
      ...this.tableParams,
      page: pageIndex + 1,
      pageIndex: pageIndex,
      pageSize: pageSize,
      from: pageIndex * pageSize + 1,
      to: Math.min((pageIndex + 1) * pageSize, this.tableParams.totalElements),
      totalElements: this.tableParams.totalElements
    };

    this.pageChange.emit(updatedParams);
  }

  onOpenRegistroDialog(row?: any): void {
    this.openRegistroDialog.emit(row);
  }

  onDelete(row: any): void {
    this.delete.emit(row);
  }

  onSelectRow(row: any, action: 'edit' | 'download'): void {
    this.selectRow.emit({ row, action });
  }

  getColumnValue(row: any, columnName: string): any {
    return row[columnName];
  }

  /**
   * 2. Marca qué columna está "activa" al presionar el botón de filtro
   *    para que el menú se abra con las opciones de esa columna.
   */
  setActiveColumn(column: string): void {
    this.activeColumn = column;
  }

  /**
   * 3. Aplica el filtro seleccionado a una columna específica.
   */
  applyFilterForColumn(column: string, value: string | number): void {
    // Update the searchQuery with the new filter
    this.tableParams.searchQuery[column] = value.toString();
    // Track the active filter option
    this.activeFilterOptions[column] = value;

    // Trigger search with updated params
    this.onSearchQueryEvent();
  }

  /**
   * 4. Limpia el filtro de una columna.
   */
  clearFilter(column: string): void {
    // Remove the filter from searchQuery
    delete this.tableParams.searchQuery[column];
    // Remove the active filter option
    delete this.activeFilterOptions[column];

    // Trigger search with updated params
    this.onSearchQueryEvent();
  }

  onSearchQueryEvent(): void {
    // Reset to first page
    this.tableParams.page = 1;
    this.tableParams.pageIndex = 0;

    // Emit the updated tableParams to parent
    this.searchEvent.emit(this.tableParams);
  }

  isFilterActive(column: string, value: string | number): boolean {
    return this.activeFilterOptions[column] === value;
  }

  /**
   * 5. Recorre todos los filtros activos y filtra la data en base a ellos.
   */
  applyAllFilters(): void {
    this.dataSource.data = this.data.filter((row) =>
      Object.keys(this.selectedFilters).every(
        (column) =>
          this.selectedFilters[column] === '' ||
          row[column] === this.selectedFilters[column]
      )
    );
  }

  getColumnType(columnName: string): string {
    const column = this.displayedColumns.find(col => col.name === columnName);
    return column ? column.type : 'string';
  }

  getColumnHeader(columnName: string): string {
    const column = this.displayedColumns.find(col => col.name === columnName);
    return column?.header || '';
  }

  // Get minimum width based on column type
  getColumnMinWidth(type: string): string {
    const minWidths = {
      text: '200px',
      string: '150px',
      date: '120px',
      number: '80px',
      action: '60px',
      download: '100px'
    };
    return minWidths[type] || '100px';
  }

  onDownload(row: any): void {
    this.download.emit(row);
  }

  getFilterOptions(column: string): FilterOption[] {
    const filterColumn = this.tableParams.filterOptions.find(option => option.key === column);
    return filterColumn ? filterColumn.options : [];
  }

  isColumnFilterable(column: string): boolean {
    return this.tableParams.filterOptions.some(option => option.key === column);
  }

  shouldShowTooltip(column: ColumnDefinition): boolean {
    let resp: boolean = false;
    if (column.width) {
      resp = true;
    }
    return resp;
  }

  getColumnStyle(column: ColumnDefinition): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (column.width) {
      styles['width'] = column.width;
      styles['max-width'] = column.width;
      styles['overflow'] = 'hidden';
      styles['text-overflow'] = 'ellipsis';
      styles['white-space'] = 'nowrap';
    } else {
      styles['width'] = 'auto';
    }
    return styles;
  }
}