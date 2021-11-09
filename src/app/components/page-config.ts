export const DEFAULT_PAGE_SIZE: number = 10;
export const DEFAULT_PAGE_NUMBER: number = 0;
export const DEFAULT_PAGE_SIZE_OPTIONS: number[] = [5, 10, 25, 100];

export interface PageConfig {
  pageNumber: number;
  pageSize: number;
  pagelength: number;
  pageSizeOptions: number[];
}


