import { Injectable } from '@angular/core';

import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class SearchService 
{
  search_url:String = "http://localhost:3000/api/search"
  searchResult:any;
  constructor(private http:Http) { }

  search(keyword)
  {
    return this.http.get(this.search_url+"/"+keyword).map(data=>data.json());
  }

}
