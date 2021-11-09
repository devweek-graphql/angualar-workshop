import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule  } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchComponent,
    CharacterDetailsComponent,
    PaginationComponent,
    PaginatePipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
