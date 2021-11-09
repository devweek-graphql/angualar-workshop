import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, PageConfig } from '../page-config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input()
  data: any[] = []

  @Input()
  pageConfig: PageConfig = {
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    pagelength: 0,
    pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS
  };


  @Input()
  public onPage: (event: PageEvent) => void = () => null;

  ngOnInit(): void {

  }
}
