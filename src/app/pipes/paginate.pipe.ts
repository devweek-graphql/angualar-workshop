import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '../components/page-config';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform(array: any[], pageSize: number, pageNumber: number): any[] {

    if(!array.length) return [];

    pageSize = pageSize || DEFAULT_PAGE_SIZE;
    pageNumber = pageNumber || DEFAULT_PAGE_NUMBER;

    //--pageNumber;

    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

}
