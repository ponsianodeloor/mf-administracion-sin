export interface TableSearchPaginated {
  page: number; //pagina actual
  pageSize: number; //cantidad de registros por pagina
  searchQuery: { [key: string]: string }; //busqueda
  sortBy: string; //columna por la que se ordena [id, name, active]
  sortDirection: string; //direccion de la ordenacion [asc, desc]
  filterOptions: FilterTableColumn[]; //opciones de filtro
  filterTableColumns: string[]; //columnas por las que se filtra [id, name, active]
  totalElements: number; //total de registros
  pageIndex: number; //indice de la pagina
  from: number; //primer registro de la pagina
  to: number; //ultimo registro de la pagina
}

export interface FilterOption {
  value: number; //valor del filtro
  name: string; //etiqueta del filtro
}

export interface FilterTableColumn {
  key: string; //columna por la que se filtra [id, name, active]
  options: FilterOption[]; //opciones del filtro [1, 2, 3]
}

export interface TableSearchPaginatedResponse {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ColumnDefinition {
  name: string;
  type: 'text' | 'string' | 'date' | 'number' | 'action' | 'download';
  header?: string;
  width?: string; // Ancho fijo opcional
}