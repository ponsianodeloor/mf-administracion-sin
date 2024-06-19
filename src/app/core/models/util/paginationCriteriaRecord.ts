export interface PaginationCriteriaRecord {
  page: number;
  size: number;
  sortDirectionRecord: {
    sortBy: string;
    sortDirection: string;
  };
  searchQuery?: string;
}
