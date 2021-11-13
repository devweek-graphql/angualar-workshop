import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/shared/interfaces/character';
import { FilterCharacter } from 'src/app/shared/interfaces/filter-character';
import { PageConfig } from 'src/app/shared/interfaces/page-config';
import { QueryResult } from 'src/app/shared/interfaces/query-result';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../page-config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchField: string = '';

  constructor(private apiFetchService: ApiFetchServiceService) { }

  @Output()
  queryResult = new EventEmitter<QueryResult<Character>>();

  ngOnInit(): void {
  }

  search() {
    const pageConfig: PageConfig = {
      pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE
    };

    const filters: FilterCharacter = {
      name: this.searchField
    };

    this.apiFetchService.getCharacterByName(API_TO_USE, pageConfig, filters)
    .subscribe(data => this.queryResult.emit(data));
  }
}
